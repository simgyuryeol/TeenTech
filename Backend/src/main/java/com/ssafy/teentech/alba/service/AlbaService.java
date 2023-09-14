package com.ssafy.teentech.alba.service;

import com.ssafy.teentech.alba.domain.Alba;
import com.ssafy.teentech.alba.domain.Status;
import com.ssafy.teentech.alba.dto.request.AlbaAcceptCompleteRequestDto;
import com.ssafy.teentech.alba.dto.request.AlbaCreateRequestDto;
import com.ssafy.teentech.alba.dto.response.AlbaResponseDto;
import com.ssafy.teentech.alba.dto.response.AlbasForChildResponseDto;
import com.ssafy.teentech.alba.dto.response.AlbasForParentResponseDto;
import com.ssafy.teentech.alba.repository.AlbaRepository;
import com.ssafy.teentech.common.error.ErrorCode;
import com.ssafy.teentech.common.error.exception.AuthException;
import com.ssafy.teentech.common.error.exception.InvalidRequestException;
import com.ssafy.teentech.common.fcm.dto.request.FCMNotificationRequestDto;
import com.ssafy.teentech.common.fcm.service.FCMNotificationService;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final FCMNotificationService fcmNotificationService;

    public AlbasForParentResponseDto getParentAlbaList(Long childId) {
        User child = userRepository.findById(childId)
            .orElseThrow(() -> new InvalidRequestException(
                ErrorCode.USER_NOT_FOUND));

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

    public void createAlba(AlbaCreateRequestDto albaCreateRequestDto) {
        User child = userRepository.findById(albaCreateRequestDto.getChildId())
            .orElseThrow(() -> new InvalidRequestException(
                ErrorCode.USER_NOT_FOUND));

        Alba alba = albaRepository.save(
            Alba.builder().user(child).title(albaCreateRequestDto.getTitle())
                .content(albaCreateRequestDto.getContent()).reward(
                    albaCreateRequestDto.getReward()).startDate(albaCreateRequestDto.getStartDate())
                .closeDate(albaCreateRequestDto.getCloseDate()).status(Status.NOT_ACCEPTED)
                .build());
    }

    public void acceptCompleteRequest(AlbaAcceptCompleteRequestDto albaAcceptCompleteRequestDto) {
        Alba alba = albaRepository.findById(albaAcceptCompleteRequestDto.getAlbaId())
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.ALBA_NOT_FOUND));

        // 부모가 완료 승인한 경우
        if (albaAcceptCompleteRequestDto.isComplete()) {
            alba.updateStatus(Status.COMPLETE);

            /**
             * 돈 이체 로직 들어갈 구간
             */

            FCMNotificationRequestDto fcmNotificationRequestDto = FCMNotificationRequestDto.builder()
                .targetUserId(albaAcceptCompleteRequestDto.getChildId()).title("아르바이트 완료 수락")
                .body("아르바이트(" + alba.getTitle() + ") 완료 요청이 수락되었어요.").build();
            fcmNotificationService.sendNotificationByToken(fcmNotificationRequestDto);
        }
    }

    public AlbasForChildResponseDto getChildAlbaList(String userEmail) {
        User child = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new InvalidRequestException(
                ErrorCode.USER_NOT_FOUND));

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

    public void acceptAlba(String userEmail, Long albaId) {
        User child = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.USER_NOT_FOUND));

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
        User child = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.USER_NOT_FOUND));

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
        User child = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.USER_NOT_FOUND));

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
