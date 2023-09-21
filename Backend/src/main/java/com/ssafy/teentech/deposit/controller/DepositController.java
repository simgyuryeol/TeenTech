package com.ssafy.teentech.deposit.controller;

import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.deposit.dto.request.DepositCreateRequestDto;
import com.ssafy.teentech.deposit.dto.response.DepositCreateResponseDto;
import com.ssafy.teentech.deposit.service.DepositService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/{child_id}/deposits")
@RequiredArgsConstructor
public class DepositController {
    private final DepositService depositService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> depositCreate(@RequestBody DepositCreateRequestDto depositCreateRequestDto, @PathVariable Long child_id){
        DepositCreateResponseDto depositCreateResponseDto = depositService.depositCreate(depositCreateRequestDto, child_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("예금 등록")
                .status(OK.value())
                .data(depositCreateResponseDto)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}
