package com.ssafy.teentech.transaction.controller;

import com.ssafy.teentech.transaction.dto.request.AutoTransactionRequestDto;
import com.ssafy.teentech.transaction.dto.request.TransactionListRequestDto;
import com.ssafy.teentech.transaction.dto.request.TransactionRequestDto;
import com.ssafy.teentech.transaction.dto.response.TransactionListResponseDto;
import com.ssafy.teentech.transaction.service.TransactionService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity transfer(
        @RequestBody TransactionRequestDto transactionRequestDto) {
        transactionService.executeTransaction(transactionRequestDto);

        return ResponseEntity.ok(null);
    }

    @PostMapping("/auto")
    public ResponseEntity autoTransfer(@RequestBody AutoTransactionRequestDto autoTransactionRequestDto) {
        transactionService.executeAutoTransaction(autoTransactionRequestDto);

        return ResponseEntity.ok(null);
    }

    @PostMapping("/list")
    public ResponseEntity<TransactionListResponseDto> getTransactions(
        @RequestBody TransactionListRequestDto transactionListRequestDto) {
        TransactionListResponseDto transactionListResponseDto = transactionService.getTransactions(
            transactionListRequestDto);

        return ResponseEntity.ok(transactionListResponseDto);
    }
}
