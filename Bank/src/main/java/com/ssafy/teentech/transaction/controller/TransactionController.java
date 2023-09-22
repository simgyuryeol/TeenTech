package com.ssafy.teentech.transaction.controller;

import com.ssafy.teentech.common.ApiResponse;
import com.ssafy.teentech.transaction.dto.request.TransactionListRequestDto;
import com.ssafy.teentech.transaction.dto.request.TransactionRequestDto;
import com.ssafy.teentech.transaction.dto.response.TransactionListResponseDto;
import com.ssafy.teentech.transaction.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<ApiResponse> transfer(
        @RequestBody TransactionRequestDto transactionRequestDto) {
        transactionService.executeTransaction(transactionRequestDto);

        ApiResponse apiResponse = ApiResponse.builder()
            .message("이체 완료")
            .status(HttpStatus.OK.value())
            .data(null)
            .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/list")
    public ResponseEntity<ApiResponse> getTransactions(
        @RequestBody TransactionListRequestDto transactionListRequestDto) {
        TransactionListResponseDto transactionListResponseDto = transactionService.getTransactions(
            transactionListRequestDto);

        ApiResponse apiResponse = ApiResponse.builder()
            .message("이체 내역 조회 완료")
            .status(HttpStatus.OK.value())
            .data(transactionListResponseDto)
            .build();
        return ResponseEntity.ok(apiResponse);
    }
}
