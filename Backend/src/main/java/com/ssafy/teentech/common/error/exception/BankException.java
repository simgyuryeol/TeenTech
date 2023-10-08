package com.ssafy.teentech.common.error.exception;

import lombok.Getter;

@Getter
public class BankException extends RuntimeException {

    private final int status;

    private final String message;

    public BankException(Integer status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
