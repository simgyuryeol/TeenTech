package com.ssafy.teentech.parent.controller;

import com.google.protobuf.Api;
import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.parent.dto.request.*;
import com.ssafy.teentech.parent.dto.response.ChildDetailResponseDto;
import com.ssafy.teentech.parent.dto.response.ChildGetResponseDto;
import com.ssafy.teentech.parent.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/parents/{parent_id}")
@RequiredArgsConstructor
public class ParentController {

    private final ParentService parentService;

    @PostMapping("/{child_id}/pinmoney")
    public ResponseEntity<ApiResponse> setUpPinMoney(@RequestBody SetUpPinMoneyRequestDto setUpPinMoney, @PathVariable Long child_id){
        parentService.setUpPinMoney(setUpPinMoney,child_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("용돈 설정")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/{child_id}/send")
    public ResponseEntity<ApiResponse> sendPinMoney(@RequestBody SendPinMoneyRequestDto sendPinMoney, @PathVariable Long child_id, @PathVariable Long parent_id){
        parentService.sendPinMoney(sendPinMoney,child_id,parent_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("용돈 보내기")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/child")
    public ResponseEntity<ApiResponse> childGet(@PathVariable Long parent_id){
        List<ChildGetResponseDto> childGetResponseDtoList = parentService.childGet(parent_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("자식 조회")
                .status(OK.value())
                .data(childGetResponseDtoList)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/child")
    public ResponseEntity<ApiResponse> childAdd(@RequestBody ChildAddRequestDto childAddRequestDto, @PathVariable Long parent_id){
        parentService.childAdd(childAddRequestDto,parent_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("자식 추가")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/child")
    public ResponseEntity<ApiResponse> childDelete(@RequestBody ChildDeleteRequestDto childDeleteRequestDto){
        parentService.childDelete(childDeleteRequestDto);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("자식 삭제")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);

    }

    @PostMapping("/safe_add")
    public ResponseEntity<ApiResponse> safeAdd(@RequestBody SafeRequestDto safeRequestDto, @PathVariable Long parent_id){
        parentService.safeAdd(safeRequestDto,parent_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("용돈 금고 추가")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/safe_sub")
    public ResponseEntity<ApiResponse> safeSub(@RequestBody SafeRequestDto safeRequestDto, @PathVariable Long parent_id ){
        parentService.safeSub(safeRequestDto,parent_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("용돈 금고 빼기")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/{child_id}/interest")
    public ResponseEntity<ApiResponse> interestRateSetting(@RequestBody InterestRateSettingRequestDto interestRateSettingRequestDto, @PathVariable Long child_id){
        parentService.interestRateSetting(interestRateSettingRequestDto,child_id);


        ApiResponse apiResponse = ApiResponse.builder()
                .message("이자율 설정")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}
