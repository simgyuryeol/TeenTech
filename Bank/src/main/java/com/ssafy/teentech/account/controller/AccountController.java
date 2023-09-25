package com.ssafy.teentech.account.controller;

import com.ssafy.teentech.account.dto.AccountResponseDto;
import com.ssafy.teentech.account.service.AccountService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<AccountResponseDto> getAccountInformation(@RequestParam Long userId) {
        AccountResponseDto accountResponseDto = accountService.getAccountInformation(userId);

        return ResponseEntity.ok(accountResponseDto);
    }

}
