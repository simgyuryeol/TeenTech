package com.ssafy.teentech.common.error.exception;

import com.ssafy.teentech.common.error.ErrorCode;

public class NotFoundException extends BaseException {

    private final ErrorCode errorCode;

    public NotFoundException(ErrorCode errorCode) {
        super(errorCode);
        this.errorCode = errorCode;
    }

}
