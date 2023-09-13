package com.ssafy.teentech.accountbook.controller;

import com.ssafy.teentech.accountbook.dto.request.AccountBookAddRequestDto;
import com.ssafy.teentech.accountbook.dto.request.AccountBookAmountRequestDto;
import com.ssafy.teentech.accountbook.dto.request.AccountBookDateRequestDto;
import com.ssafy.teentech.accountbook.dto.responsee.AccountBookAmountResponseDto;
import com.ssafy.teentech.accountbook.dto.responsee.AccountBookDateResponseDto;
import com.ssafy.teentech.accountbook.service.AccountBookService;
import com.ssafy.teentech.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
                .message("가계부 가격 내역")
                .status(OK.value())
                .data(accountBookAmountResponseDto)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/date")
    public ResponseEntity<ApiResponse> accountBookDate(@RequestBody AccountBookDateRequestDto accountBookDateRequestDto){
        List<AccountBookDateResponseDto> accountBookDateResponseDtoList = accountBookService.accountBookDate(accountBookDateRequestDto);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("가계부 날짜 내역")
                .status(OK.value())
                .data(accountBookDateResponseDtoList)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping()
    public ResponseEntity<ApiResponse> accountBookAdd(@RequestBody AccountBookAddRequestDto accountBookAddRequestDto){
        accountBookService.accountBookAdd(accountBookAddRequestDto);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("가계부 추가")
                .status(OK.value())
                .data(null)
                .build();

        return ResponseEntity.ok(apiResponse);
    }
}
