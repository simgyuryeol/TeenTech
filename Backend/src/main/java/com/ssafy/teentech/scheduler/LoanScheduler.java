package com.ssafy.teentech.scheduler;

import com.ssafy.teentech.common.error.ErrorCode;
import com.ssafy.teentech.common.error.exception.NotFoundException;
import com.ssafy.teentech.loan.domain.Loan;
import com.ssafy.teentech.loan.domain.State;
import com.ssafy.teentech.loan.repository.LoanRepository;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class LoanScheduler {

    private final LoanRepository loanRepository;
    private final ChildDetailRepository childDetailRepository;

    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void loanRepaymentFail() {
        LocalDate nowDate = LocalDate.now(ZoneId.of("Asia/Seoul")); //서울 오늘 날짜

        List<Loan> unRepayedLoanList = loanRepository.findAllByMaturityDateIsBeforeAndState(
            nowDate, State.ACCEPT);

        unRepayedLoanList.forEach((loan) -> {
            if (loan.getBalance().equals(0)) {
                loan.updateState(State.COMPLETE);
            } else {
                loan.updateState(State.FAIL);
                User user = loan.getUser();
                ChildDetail childDetail = childDetailRepository.findByUser(user)
                    .orElseThrow(() -> new NotFoundException(ErrorCode.CHILD_DETAIL_NOT_FOUND));
                Integer creditRating = childDetail.getCreditRating();
                if (!creditRating.equals(10)) {
                    childDetail.setCreditRating(creditRating + 1);
                }
            }
        });
    }
}
