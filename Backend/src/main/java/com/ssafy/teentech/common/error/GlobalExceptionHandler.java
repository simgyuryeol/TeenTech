package com.ssafy.teentech.common.error;

import com.ssafy.teentech.common.error.exception.BankException;
import com.ssafy.teentech.common.error.exception.BaseException;
import com.ssafy.teentech.common.response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleServerException(Exception e) {
        return handleException(e, ErrorCode.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(BankException.class)
    public ResponseEntity<ErrorResponse> handleBankException(BankException e) {
        ErrorResponse errorResponse = new ErrorResponse(e.getStatus(), e.getMessage());
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorResponse> handleBaseException(BaseException e) {
        return handleException(e, e.getErrorCode());
    }

    private ResponseEntity<ErrorResponse> handleException(Exception e, ErrorCode errorCode) {
        ErrorResponse errorResponse = ErrorResponse.of(errorCode);
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }
}
