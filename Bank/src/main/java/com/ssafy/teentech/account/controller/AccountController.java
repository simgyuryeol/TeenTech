package com.ssafy.teentech.account.controller;

import com.ssafy.teentech.account.dto.AccountResponseDto;
import com.ssafy.teentech.account.service.AccountService;
import com.ssafy.teentech.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @GetMapping("/information")
    public ResponseEntity<ApiResponse> getAccountInformation(@RequestParam Long userId) {
        AccountResponseDto accountResponseDto = accountService.getAccountInformation(userId);

        ApiResponse apiResponse = ApiResponse.builder()
            .message("계좌 정보 조회 완료")
            .status(HttpStatus.OK.value())
            .data(accountResponseDto)
            .build();
        return ResponseEntity.ok(apiResponse);
    }

}
