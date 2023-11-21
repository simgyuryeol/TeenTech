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

    ACCOUNT_NOT_FOUND(404, "해당 계좌를 찾을 수 없습니다."),
    NOT_OWNER_OF_ACCOUNT(400, "계좌주와 일치하지 않습니다."),
    ACCOUNT_PASSWORD_MISMATCH(400, "계좌 비밀번호가 틀렸습니다."),
    WITHDRAW_OVER_BALANCE(400, "요청하신 금액이 잔액보다 많습니다."),

    INVALID_TRANSFER_AMOUNT(400, "이체 금액은 0원보다 커야합니다.");

    private int status;
    private String message;

    private static final Map<String, ErrorCode> messageMap = Collections.unmodifiableMap(
        Stream.of(values()).collect(
            Collectors.toMap(ErrorCode::getMessage, Function.identity())));

    public static ErrorCode fromMessage(String message) {
        return messageMap.get(message);
    }

}
