package com.ssafy.teentech.common.error.exception;

import com.ssafy.teentech.common.error.ErrorCode;

public class AccountException extends BaseException {

    private final ErrorCode errorCode;

    public AccountException(ErrorCode errorCode) {
        super(errorCode);
        this.errorCode = errorCode;
    }
}
