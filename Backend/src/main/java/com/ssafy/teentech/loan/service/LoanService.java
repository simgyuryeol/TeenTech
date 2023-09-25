package com.ssafy.teentech.loan.service;

import com.ssafy.teentech.bank.dto.request.TransactionRequestDto;
import com.ssafy.teentech.bank.dto.response.AccountResponseDto;
import com.ssafy.teentech.bank.service.BankService;
import com.ssafy.teentech.common.error.ErrorCode;
import com.ssafy.teentech.common.error.exception.BankException;
import com.ssafy.teentech.common.error.exception.InvalidRequestException;
import com.ssafy.teentech.common.error.exception.PermissionDeniedException;
import com.ssafy.teentech.common.fcm.dto.request.FCMNotificationRequestDto;
import com.ssafy.teentech.common.fcm.service.FCMNotificationService;
import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.loan.domain.Loan;
import com.ssafy.teentech.loan.domain.Repayment;
import com.ssafy.teentech.loan.dto.request.LoanApplyRequestDto;
import com.ssafy.teentech.loan.dto.request.LoanApproveRequestDto;
import com.ssafy.teentech.loan.dto.request.LoanRejectRequestDto;
import com.ssafy.teentech.loan.dto.request.RepayRequestDto;
import com.ssafy.teentech.loan.dto.response.LoanApplyResponseDto;
import com.ssafy.teentech.loan.dto.response.LoanHistoryResponseDto;
import com.ssafy.teentech.loan.dto.response.LoanSummaryListParentResponseDto;
import com.ssafy.teentech.loan.dto.response.LoanSummaryListResponseDto;
import com.ssafy.teentech.loan.dto.response.LoanSummaryResponseDto;
import com.ssafy.teentech.loan.repository.LoanRepository;
import com.ssafy.teentech.loan.repository.RepaymentRepository;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import com.ssafy.teentech.user.service.UserService;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoanService {

    private final LoanRepository loanRepository;
    private final RepaymentRepository repaymentRepository;
    private final ChildDetailRepository childDetailRepository;
    private final UserService userService;
    private final BankService bankService;
    private final FCMNotificationService fcmNotificationService;

    public void applyLoan(LoanApplyRequestDto loanApplyRequestDto, String userEmail) {
        User child = userService.getUser(userEmail);
        ChildDetail childDetail = childDetailRepository.findByUser(child)
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.USER_NOT_FOUND));

        /**
         * 대출 현황 조회해서 남은 금액과 현재 신청한 금액의 합이 용돈의 50% 이상이면 반려
         */
        List<LoanSummaryResponseDto> inProgressLoanList = loanRepository.findAllByUserAndBalanceIsGreaterThanZero(
            child);

        Integer totalLoanBalance = inProgressLoanList.stream()
            .map(LoanSummaryResponseDto::getLastBalance).reduce(0, (x, y) -> x + y).intValue();

        if (totalLoanBalance + loanApplyRequestDto.getAmount() >= childDetail.getPocketMoney()) {
            throw new InvalidRequestException(ErrorCode.LOAN_LIMIT_EXCEED);
        }

        Loan loan = Loan.builder().user(child).title(loanApplyRequestDto.getTitle())
            .amount(loanApplyRequestDto.getAmount()).period(loanApplyRequestDto.getPeriod())
            .reason(loanApplyRequestDto.getReason())
            .interestRate(BigDecimal.valueOf(childDetail.getLoanInterestRate()))
            .build();

        loanRepository.save(loan);
    }

    public LoanSummaryListResponseDto getLoanSummary(String userEmail) {
        User child = userService.getUser(userEmail);
        ChildDetail childDetail = childDetailRepository.findByUser(child)
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.USER_NOT_FOUND));

        List<LoanSummaryResponseDto> inProgressLoanList = loanRepository.findAllByUserAndBalanceIsGreaterThanZero(
            child);

        Integer totalLoanBalance = inProgressLoanList.stream()
            .map(LoanSummaryResponseDto::getLastBalance).reduce(0, (x, y) -> x + y).intValue();

        LoanSummaryListResponseDto loanSummaryListResponseDto = new LoanSummaryListResponseDto(
            childDetail.getCreditRating(),
            inProgressLoanList.size(), totalLoanBalance, inProgressLoanList);

        return loanSummaryListResponseDto;
    }

    public List<LoanHistoryResponseDto> getLoanHistory(String userEmail) {
        User child = userService.getUser(userEmail);

        List<LoanHistoryResponseDto> loanHistoryResponseDtoList = loanRepository.findAllByUserAndBalanceIsEqualToZero(
            child);

        return loanHistoryResponseDtoList;
    }

    public void executeRepay(String userEmail, RepayRequestDto repayRequestDto) {
        User child = userService.getUser(userEmail);

        Loan loan = loanRepository.findById(repayRequestDto.getLoanId())
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.LOAN_NOT_FOUND));

        if (!loan.getUser().getUserId().equals(child.getUserId())) {
            throw new PermissionDeniedException(ErrorCode.NO_PERMISSION_TO_APPLY_LOAN);
        }

        if (loan.getBalance().equals(0)) {
            throw new InvalidRequestException(ErrorCode.ALREADY_COMPLETED_REPAYMENT);
        }

        if (loan.getBalance() < repayRequestDto.getAmount()) {
            throw new InvalidRequestException(ErrorCode.INVALID_REPAYMENT_AMOUNT);
        }

        /**
         * 자식 계좌 잔액 확인
         */
        AccountResponseDto childAccountInformation = bankService.getAccountInformation(
            child.getUserId());

        if (childAccountInformation.getBalance() < repayRequestDto.getAmount()) {
            throw new InvalidRequestException(ErrorCode.BALANCE_NOT_ENOUGH);
        }

        /**
         * 부모 계좌 정보 확인
         */
        AccountResponseDto parentAccountInformation = bankService.getAccountInformation(
            child.getParentId());

        TransactionRequestDto transactionRequestDto = new TransactionRequestDto(child.getUserId(),
            childAccountInformation.getAccountNumber(),
            repayRequestDto.getPassword(), parentAccountInformation.getAccountNumber(),
            new Long(repayRequestDto.getAmount()), loan.getTitle() + " 대출 상환");

        ApiResponse transferResponse = bankService.transfer(transactionRequestDto);

        if (transferResponse.getStatus() == 200) {
            Repayment repayment = Repayment.builder().loan(loan).amount(repayRequestDto.getAmount())
                .repaymentDate(LocalDate.now()).build();
            repaymentRepository.save(repayment);
            loan.updateBalance(loan.getBalance() - repayment.getAmount());
            if (loan.getBalance().equals(0)) {
                loan.updateRepaymentCompletionDate(LocalDate.now());
            }
        } else {
            throw new BankException(500, "이체 과정에서 문제가 발생했습니다.");
        }


    }

    public LoanSummaryListParentResponseDto getChildLoanSummary(String parentEmail, Long childId) {
        User parent = userService.getUser(parentEmail);

        User child = userService.getUser(childId);

        if (!parent.getUserId().equals(child.getParentId())) {
            throw new PermissionDeniedException(ErrorCode.NO_PERMISSION_TO_READ_LOAN);
        }

        // 대출 신청 목록
        List<LoanApplyResponseDto> loanApplyResponseDtoList = loanRepository.findAllByUserAndApprovalDateIsNull(
            child);

        // 상환 진행중인 대출 목록 + 상환 진행중인 대출의 요약
        List<LoanSummaryResponseDto> inProgressLoanList = loanRepository.findAllByUserAndBalanceIsGreaterThanZero(
            child);

        Integer totalLoanBalance = inProgressLoanList.stream()
            .map(LoanSummaryResponseDto::getLastBalance).reduce(0, (x, y) -> x + y).intValue();

        LoanSummaryListParentResponseDto loanSummaryListParentResponseDto = new LoanSummaryListParentResponseDto(
            inProgressLoanList.size(), totalLoanBalance, loanApplyResponseDtoList,
            inProgressLoanList);

        return loanSummaryListParentResponseDto;
    }

    public List<LoanHistoryResponseDto> getChildLoanHistory(String parentEmail, Long childId) {
        User parent = userService.getUser(parentEmail);

        User child = userService.getUser(childId);

        if (!parent.getUserId().equals(child.getParentId())) {
            throw new PermissionDeniedException(ErrorCode.NO_PERMISSION_TO_READ_LOAN);
        }

        List<LoanHistoryResponseDto> loanHistoryResponseDtoList = loanRepository.findAllByUserAndBalanceIsEqualToZero(
            child);

        return loanHistoryResponseDtoList;
    }

    public void approveLoan(String parentEmail,
        LoanApproveRequestDto loanApproveRequestDto) {
        User parent = userService.getUser(parentEmail);

        Loan loan = loanRepository.findById(loanApproveRequestDto.getLoanId())
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.LOAN_NOT_FOUND));

        if (!Objects.isNull(loan.getApprovalDate())) {
            throw new InvalidRequestException(ErrorCode.ALREADY_APPROVED_LOAN);
        }

        /**
         * 부모 계좌의 잔액 확인
         */
        AccountResponseDto parentAccountInformation = bankService.getAccountInformation(
            parent.getUserId());

        if (parentAccountInformation.getBalance() < loan.getAmount()) {
            throw new InvalidRequestException(ErrorCode.BALANCE_NOT_ENOUGH);
        }

        /**
         * 자식 계좌 정보 확인
         */
        AccountResponseDto childAccountInformation = bankService.getAccountInformation(
            loan.getUser().getUserId());

        /**
         * 이체
         */
        TransactionRequestDto transactionRequestDto = new TransactionRequestDto(parent.getUserId(),
            parentAccountInformation.getAccountNumber(),
            loanApproveRequestDto.getPassword(), childAccountInformation.getAccountNumber(),
            new Long(loan.getAmount()), loan.getTitle() + " 대출 승인");

        ApiResponse transferResponse = bankService.transfer(transactionRequestDto);

        if (transferResponse.getStatus() == 200) {
            /**
             * 승인됨에 따라 추가되는 필드들 채워넣기
             */
            LocalDate approvalDate = LocalDate.now();
            LocalDate maturityDate = approvalDate.plusMonths(loan.getPeriod());
            BigDecimal totalInterest = new BigDecimal(loan.getAmount()).multiply(
                    loan.getInterestRate()).setScale(1, RoundingMode.UP);
            Integer balance = loan.getAmount() + totalInterest.intValue();

            loan.updateApprovalDate(approvalDate);
            loan.updateMaturityDate(maturityDate);
            loan.updateBalance(balance);
        } else {
            throw new BankException(500, "이체 과정에서 문제가 발생했습니다.");
        }
    }

    public void rejectLoan(String parentEmail, LoanRejectRequestDto loanRejectRequestDto) {
        User parent = userService.getUser(parentEmail);

        Loan loan = loanRepository.findById(loanRejectRequestDto.getLoanId())
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.LOAN_NOT_FOUND));

        Long childId = loan.getUser().getUserId();
        String loanTitle = loan.getTitle();
        loanRepository.deleteById(loan.getLoanId());

        FCMNotificationRequestDto fcmNotificationRequestDto = FCMNotificationRequestDto.builder()
            .targetUserId(childId).title("대출 신청이 거절되었어요.")
            .body("대출 신청(" + loanTitle + ")이 거절되었어요. 거절된 대출 신청은 삭제되었어요.").build();
        fcmNotificationService.sendNotificationByToken(fcmNotificationRequestDto);
    }

}
