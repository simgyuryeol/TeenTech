package com.ssafy.teentech.parent.controller;

import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.parent.dto.request.ChildAddRequestDto;
import com.ssafy.teentech.parent.dto.request.SendPinMoneyRequestDto;
import com.ssafy.teentech.parent.dto.request.SetUpPinMoneyRequestDto;
import com.ssafy.teentech.parent.dto.response.ChildGetResponseDto;
import com.ssafy.teentech.parent.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @GetMapping()
    public ResponseEntity<ApiResponse> childGet(@PathVariable Long parent_id){
        List<ChildGetResponseDto> childGetResponseDtoList = parentService.childGet(parent_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("자식 조회")
                .status(OK.value())
                .data(childGetResponseDtoList)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping()
    public ResponseEntity<ApiResponse> childAdd(@RequestBody ChildAddRequestDto childAddRequestDto, @PathVariable Long parent_id){
        parentService.childAdd(childAddRequestDto,parent_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("자식 추가")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}
