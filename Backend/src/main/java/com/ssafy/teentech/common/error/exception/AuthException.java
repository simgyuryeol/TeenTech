package com.ssafy.teentech.common.error.exception;

import com.ssafy.teentech.common.error.ErrorCode;

public class AuthException extends BaseException {
    private final ErrorCode errorCode;

    public AuthException(ErrorCode errorCode) {
        super(errorCode);
        this.errorCode = errorCode;
    }
}
