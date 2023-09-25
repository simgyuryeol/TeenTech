package com.ssafy.teentech.common.error.exception;

import com.ssafy.teentech.common.error.ErrorCode;

public class PermissionDeniedException extends BaseException {

    private final ErrorCode errorCode;

    public PermissionDeniedException(ErrorCode errorCode) {
        super(errorCode);
        this.errorCode = errorCode;
    }
}
