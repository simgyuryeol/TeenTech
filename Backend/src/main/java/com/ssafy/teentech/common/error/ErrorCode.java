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

    FAIL_UNLINKING_KAKAO_ACCOUNT(500, "카카오 계정의 연결을 끊는데 실패했습니다."),
    OAUTH_EMAIL_REQUIRED(500, "OAuth email을 수집하는데 실패하였습니다.");

    private int status;
    private String message;

    private static final Map<String, ErrorCode> messageMap = Collections.unmodifiableMap(
        Stream.of(values()).collect(
            Collectors.toMap(ErrorCode::getMessage, Function.identity())));

    public static ErrorCode fromMessage(String message) {
        return messageMap.get(message);
    }
}
