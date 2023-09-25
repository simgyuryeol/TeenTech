package com.ssafy.teentech.common.error;

import java.util.Collections;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    INTERNAL_SERVER_ERROR(500, "서버에 문제가 생겼습니다."),

    // AuthException
    FAIL_UNLINKING_KAKAO_ACCOUNT(500, "카카오 계정의 연결을 끊는데 실패했습니다."),
    OAUTH_EMAIL_REQUIRED(500, "OAuth email을 수집하는데 실패하였습니다."),
    NO_AUTHORITY_TOKEN(500, "권한 정보가 없는 토큰입니다."),
    INVALID_ACCESS_TOKEN(500, "유효하지 않은 엑세스 토큰입니다."),
    INVALID_REFRESH_TOKEN(500, "유효하지 않은 리프레시 토큰입니다."),
    TOKEN_EXPIRED(500, "이미 만료된 토큰입니다."),
    RESOURCE_PERMISSION_DENIED(400, "해당 리소스에 대한 작업 권한이 없습니다."),

    // InvalidRequestException
    UNAUTHORIZED_REDIRECT_URI(400, "Unauthorized Redirect URI."),
    REFRESH_TOKEN_NOT_FOUND(500, "리프레시 토큰을 찾을 수 없습니다."),
    USER_NOT_FOUND(404, "해당 유저를 찾을 수 없습니다."),
    ALBA_NOT_FOUND(404, "해당 아르바이트를 찾을 수 없습니다."),
    ALREADY_ACCEPTED_ALBA(400, "이미 수락된적 있는 아르바이트입니다."),
    INVALID_ALBA_DATE(400, "유효하지 않은 아르바이트 기간입니다."),
    ALBA_NOT_ACCEPTED(400, "수락된 적 없는 아르바이트입니다."),
    ALREADY_GIVE_UP_ALBA(400, "이미 포기한 아르바이트입니다."),
    FCM_TOKEN_NOT_FOUND(400, "FCM TOKEN을 찾을 수 없습니다."),
    LOAN_NOT_FOUND(400, "해당 대출 건을 찾을 수 없습니다."),
    ALREADY_COMPLETED_REPAYMENT(400, "이미 상환 완료된 대출입니다."),
    INVALID_REPAYMENT_AMOUNT(400, "상환 금액이 남은 대출 잔액보다 큽니다."),
    ALREADY_APPROVED_LOAN(400, "이미 승인된 대출입니다."),
    BALANCE_NOT_ENOUGH(400, "계좌 잔액이 부족합니다."),
    LOAN_LIMIT_EXCEED(400, "남은 총 상환 금액과 대출 신청 금액의 합이 용돈의 50% 이상입니다."),

    FAIL_SEND_FCM_MESSAGE(400, "알림 보내기를 실패하였습니다."),

    // PermissionDeniedException
    NO_PERMISSION_TO_APPLY_LOAN(400, "해당 대출을 상환할 수 없습니다."),
    NO_PERMISSION_TO_READ_LOAN(400, "해당 유저의 대출을 조회할 수 없습니다.");

    private int status;
    private String message;

    private static final Map<String, ErrorCode> messageMap = Collections.unmodifiableMap(
        Stream.of(values()).collect(
            Collectors.toMap(ErrorCode::getMessage, Function.identity())));

    public static ErrorCode fromMessage(String message) {
        return messageMap.get(message);
    }
}
