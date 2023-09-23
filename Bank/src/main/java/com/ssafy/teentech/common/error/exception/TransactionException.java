package com.ssafy.teentech.common.error.exception;

import com.ssafy.teentech.common.error.ErrorCode;

public class TransactionException extends BaseException {

    private final ErrorCode errorCode;

    public TransactionException(ErrorCode errorCode) {
        super(errorCode);
        this.errorCode = errorCode;
    }
}
