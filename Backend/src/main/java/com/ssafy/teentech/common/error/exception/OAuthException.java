package com.ssafy.teentech.common.error.exception;

import com.ssafy.teentech.common.error.ErrorCode;

public class OAuthException extends BaseException {
    private final ErrorCode errorCode;

    public OAuthException(ErrorCode errorCode) {
        super(errorCode);
        this.errorCode = errorCode;
    }
}
