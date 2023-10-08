package com.ssafy.teentech.common.error.exception;

import com.ssafy.teentech.common.error.ErrorCode;

public class InvalidRequestException extends BaseException {

    private final ErrorCode errorCode;

    public InvalidRequestException(ErrorCode errorCode) {
        super(errorCode);
        this.errorCode = errorCode;
    }
}
