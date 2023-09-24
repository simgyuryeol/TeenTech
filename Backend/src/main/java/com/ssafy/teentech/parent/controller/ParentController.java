package com.ssafy.teentech.parent.controller;

import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.parent.dto.request.SetUpPinMoney;
import com.ssafy.teentech.parent.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/parents/{parent_id}")
@RequiredArgsConstructor
public class ParentController {

    private final ParentService parentService;

    @PostMapping("/{child_id}/pinmoney")
    public ResponseEntity<ApiResponse> setUpPinMoney(@RequestBody SetUpPinMoney setUpPinMoney, @PathVariable Long child_id){
        parentService.setUpPinMoney(setUpPinMoney,child_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("용돈 설정")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}
