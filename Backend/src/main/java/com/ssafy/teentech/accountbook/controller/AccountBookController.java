package com.ssafy.teentech.accountbook.controller;

import com.ssafy.teentech.accountbook.dto.request.AccountBookAmountRequestDto;
import com.ssafy.teentech.accountbook.dto.responsee.AccountBookAmountResponseDto;
import com.ssafy.teentech.accountbook.service.AccountBookService;
import com.ssafy.teentech.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/{child_id}/accountbooks")
@RequiredArgsConstructor
public class AccountBookController {

    final private AccountBookService accountBookService;
    @GetMapping()
    public ResponseEntity<ApiResponse> accountBookAmount(@RequestBody AccountBookAmountRequestDto accountBookAmountRequestDto){
        AccountBookAmountResponseDto accountBookAmountResponseDto = accountBookService.accountBookAmount(accountBookAmountRequestDto);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("회원정보")
                .status(OK.value())
                .data(accountBookAmountResponseDto)
                .build();

        return ResponseEntity.ok(apiResponse);
    }
}
