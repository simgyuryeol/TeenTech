package com.ssafy.teentech.child.controller;

import com.ssafy.teentech.child.dto.AvatarUpdate;
import com.ssafy.teentech.child.service.ChildService;
import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.parent.dto.request.ChildAddRequestDto;
import com.ssafy.teentech.parent.dto.response.ChildDetailResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/childs")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;
    @PostMapping("/{child_id}")
    public ResponseEntity<ApiResponse> avatarUpdate(@RequestBody AvatarUpdate avatarUpdate, @PathVariable Long child_id){
        childService.avatarUpdate(avatarUpdate,child_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("아바타 수정")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/child/{child_id}")
    public ResponseEntity<ApiResponse> childDetail(@PathVariable Long child_id){
        ChildDetailResponseDto childDetailResponseDto = childService.childDetail(child_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("자식 상세 조회")
                .status(OK.value())
                .data(childDetailResponseDto)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}
