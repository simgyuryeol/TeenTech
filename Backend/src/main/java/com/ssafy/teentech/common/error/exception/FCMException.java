package com.ssafy.teentech.common.error.exception;

import com.ssafy.teentech.common.error.ErrorCode;

public class FCMException extends BaseException{

    private final ErrorCode errorCode;

    public FCMException(ErrorCode errorCode) {
        super(errorCode);
        this.errorCode = errorCode;
    }
}
