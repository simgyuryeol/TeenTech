package com.ssafy.teentech.alba.service;

import com.ssafy.teentech.alba.domain.Alba;
import com.ssafy.teentech.alba.domain.Status;
import com.ssafy.teentech.alba.dto.request.AlbaAcceptCompleteRequestDto;
import com.ssafy.teentech.alba.dto.request.AlbaCreateRequestDto;
import com.ssafy.teentech.alba.dto.request.AlbaRejectCompleteRequestDto;
import com.ssafy.teentech.alba.dto.response.AlbaCompletedListResponseDto;
import com.ssafy.teentech.alba.dto.response.AlbaCompletedResponseDto;
import com.ssafy.teentech.alba.dto.response.AlbaResponseDto;
import com.ssafy.teentech.alba.dto.response.AlbasForChildResponseDto;
import com.ssafy.teentech.alba.dto.response.AlbasForParentResponseDto;
import com.ssafy.teentech.alba.repository.AlbaRepository;
import com.ssafy.teentech.bank.dto.request.TransactionRequestDto;
import com.ssafy.teentech.bank.dto.response.AccountResponseDto;
import com.ssafy.teentech.bank.service.BankService;
import com.ssafy.teentech.common.error.ErrorCode;
import com.ssafy.teentech.common.error.exception.AuthException;
import com.ssafy.teentech.common.error.exception.InvalidRequestException;
import com.ssafy.teentech.common.fcm.dto.request.FCMNotificationRequestDto;
import com.ssafy.teentech.common.fcm.service.FCMNotificationService;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.service.UserService;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AlbaService {

    private final AlbaRepository albaRepository;
    private final UserService userService;
    private final BankService bankService;
    private final FCMNotificationService fcmNotificationService;

    public AlbasForParentResponseDto getParentAlbaList(Long childId) {
        User child = userService.getUser(childId);

        LocalDate today = LocalDate.now();

        // 진행중인 알바
        List<AlbaResponseDto> inProgressAlbaList = albaRepository.getAllByUserAndStatusAndCloseDateIsAfter(
                child, Status.IN_PROGRESS, today).stream().map(AlbaResponseDto::new)
            .collect(Collectors.toList());

        // 공고를 냈던 알바(현재 진행중인 것은 제외)
        List<AlbaResponseDto> createdBeforeNowAlbaList = albaRepository.getAllByUserAndCloseDateBefore(
            child, today).stream().map(AlbaResponseDto::new).collect(Collectors.toList());

        return new AlbasForParentResponseDto(inProgressAlbaList, createdBeforeNowAlbaList);

    }

    public AlbaCompletedListResponseDto getCompletedAlbaList(String userEmail, Long childId) {
        User parent = userService.getUser(userEmail);
        User child = userService.getUser(childId);

        if (!parent.getUserId().equals(child.getParentId())) {
            throw new InvalidRequestException(ErrorCode.RESOURCE_PERMISSION_DENIED);
        }

        List<AlbaCompletedResponseDto> albaCompletedResponseDtoList = albaRepository.findAllByUserAndCloseDateBeforeAndStatusOrderByStatus(child, LocalDate.now(),
            Status.COMPLETE);

        return new AlbaCompletedListResponseDto(albaCompletedResponseDtoList);
    }

    public void createAlba(AlbaCreateRequestDto albaCreateRequestDto) {
        User child = userService.getUser(albaCreateRequestDto.getChildId());

        Alba alba = albaRepository.save(
            Alba.builder().user(child).title(albaCreateRequestDto.getTitle())
                .content(albaCreateRequestDto.getContent()).reward(
                    albaCreateRequestDto.getReward()).startDate(albaCreateRequestDto.getStartDate())
                .closeDate(albaCreateRequestDto.getCloseDate()).status(Status.NOT_ACCEPTED)
                .build());
    }

    public void acceptCompleteRequest(String parentEmail,
        AlbaAcceptCompleteRequestDto albaAcceptCompleteRequestDto) {
        User parent = userService.getUser(parentEmail);
        User child = userService.getUser(albaAcceptCompleteRequestDto.getChildId());

        Alba alba = albaRepository.findById(albaAcceptCompleteRequestDto.getAlbaId())
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.ALBA_NOT_FOUND));

        if (!parent.getParentId().equals(child.getParentId())) {
            throw new AuthException(ErrorCode.RESOURCE_PERMISSION_DENIED);
        }

        checkUser(child, alba);

        alba.updateStatus(Status.COMPLETE);

        AccountResponseDto parentAccountInformation = bankService.getAccountInformation(
            parent.getUserId());

        AccountResponseDto childAccountInformation = bankService.getAccountInformation(
            albaAcceptCompleteRequestDto.getChildId());

        TransactionRequestDto transactionRequestDto = new TransactionRequestDto(parent.getUserId(),
            parentAccountInformation.getAccountNumber(), albaAcceptCompleteRequestDto.getPassword(),
            childAccountInformation.getAccountNumber(), Long.valueOf(alba.getReward()),
            alba.getTitle() + " 알바비 이체");
        bankService.transfer(transactionRequestDto);

        FCMNotificationRequestDto fcmNotificationRequestDto = FCMNotificationRequestDto.builder()
            .targetUserId(albaAcceptCompleteRequestDto.getChildId()).title("아르바이트 완료 수락")
            .body("아르바이트(" + alba.getTitle() + ") 완료 요청이 수락되었어요.").build();
        fcmNotificationService.sendNotificationByToken(fcmNotificationRequestDto);

    }

    public void rejectCompleteRequest(String parentEmail,
        AlbaRejectCompleteRequestDto albaRejectCompleteRequestDto) {
        User parent = userService.getUser(parentEmail);
        User child = userService.getUser(albaRejectCompleteRequestDto.getChildId());

        Alba alba = albaRepository.findById(albaRejectCompleteRequestDto.getAlbaId())
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.ALBA_NOT_FOUND));

        if (!parent.getParentId().equals(child.getParentId())) {
            throw new AuthException(ErrorCode.RESOURCE_PERMISSION_DENIED);
        }

        checkUser(child, alba);

        alba.updateStatus(Status.REJECT);

        FCMNotificationRequestDto fcmNotificationRequestDto = FCMNotificationRequestDto.builder()
            .targetUserId(albaRejectCompleteRequestDto.getChildId()).title("아르바이트 완료 거절")
            .body("아르바이트(" + alba.getTitle() + ") 완료 요청이 거절되었어요.").build();
        fcmNotificationService.sendNotificationByToken(fcmNotificationRequestDto);

    }

    public AlbasForChildResponseDto getChildAlbaList(String userEmail) {
        User child = userService.getUser(userEmail);

        LocalDate today = LocalDate.now();

        // 진행중인 알바
        List<AlbaResponseDto> inProgressAlbaList = albaRepository.getAllByUserAndStatusAndCloseDateIsAfter(
                child, Status.IN_PROGRESS, today).stream().map(AlbaResponseDto::new)
            .collect(Collectors.toList());

        // 신청가능한 알바
        List<AlbaResponseDto> applicableAlbaList = albaRepository.getAllByUserAndStatusAndCloseDateIsAfter(
                child, Status.NOT_ACCEPTED, today).stream().map(AlbaResponseDto::new)
            .collect(Collectors.toList());

        return new AlbasForChildResponseDto(inProgressAlbaList, applicableAlbaList);

    }

    public AlbaCompletedListResponseDto getCompletedAlbaList(String userEmail) {
        User child = userService.getUser(userEmail);

        List<AlbaCompletedResponseDto> albaCompletedResponseDtoList = albaRepository.findAllByUserAndCloseDateBeforeAndStatusOrderByStatus(child, LocalDate.now(),
            Status.COMPLETE);

        return new AlbaCompletedListResponseDto(albaCompletedResponseDtoList);
    }

    public void acceptAlba(String userEmail, Long albaId) {
        User child = userService.getUser(userEmail);

        Alba alba = albaRepository.findById(albaId)
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.ALBA_NOT_FOUND));

        checkUser(child, alba);
        checkDate(alba);

        if (alba.getStatus().equals(Status.IN_PROGRESS)) {
            throw new InvalidRequestException(ErrorCode.ALREADY_ACCEPTED_ALBA);
        }

        alba.updateStatus(Status.IN_PROGRESS);
    }

    public void albaCompleteRequest(String userEmail, Long albaId) {
        User child = userService.getUser(userEmail);

        Alba alba = albaRepository.findById(albaId)
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.ALBA_NOT_FOUND));

        checkUser(child, alba);
        checkDate(alba);

        if (alba.getStatus().equals(Status.NOT_ACCEPTED)) {
            throw new InvalidRequestException(ErrorCode.ALBA_NOT_ACCEPTED);
        }

        if (alba.getStatus().equals(Status.GIVE_UP)) {
            throw new InvalidRequestException(ErrorCode.ALREADY_GIVE_UP_ALBA);
        }

        FCMNotificationRequestDto fcmNotificationRequestDto = FCMNotificationRequestDto.builder()
            .targetUserId(child.getParentId()).title("아르바이트 검수 요청")
            .body("아르바이트(" + alba.getTitle() + ")를 성실히 했는지 검사해주세요.").build();
        fcmNotificationService.sendNotificationByToken(fcmNotificationRequestDto);
    }

    public void giveUpAlba(String userEmail, Long albaId) {
        User child = userService.getUser(userEmail);

        Alba alba = albaRepository.findById(albaId)
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.ALBA_NOT_FOUND));

        checkUser(child, alba);
        checkDate(alba);

        if (!alba.getStatus().equals(Status.IN_PROGRESS)) {
            throw new InvalidRequestException(ErrorCode.ALBA_NOT_ACCEPTED);
        }

        alba.updateStatus(Status.GIVE_UP);
    }

    private void checkUser(User child, Alba alba) {
        if (!Objects.equals(child.getUserId(), alba.getUser().getUserId())) {
            throw new AuthException(ErrorCode.RESOURCE_PERMISSION_DENIED);
        }
    }

    private void checkDate(Alba alba) {
        LocalDate today = LocalDate.now();

        if (alba.getStartDate().isAfter(today) || alba.getCloseDate().isBefore(today)) {
            throw new InvalidRequestException(ErrorCode.INVALID_ALBA_DATE);
        }
    }
}
