package com.ssafy.teentech.alba.controller;

import com.ssafy.teentech.alba.dto.request.AlbaAcceptCompleteRequestDto;
import com.ssafy.teentech.alba.dto.request.AlbaCreateRequestDto;
import com.ssafy.teentech.alba.dto.request.AlbaRejectCompleteRequestDto;
import com.ssafy.teentech.alba.dto.response.AlbaCompletedListResponseDto;
import com.ssafy.teentech.alba.dto.response.AlbasForParentResponseDto;
import com.ssafy.teentech.alba.service.AlbaService;
import com.ssafy.teentech.common.entity.CurrentUser;
import com.ssafy.teentech.common.response.ApiResponse;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/albas/parent")
@RequiredArgsConstructor
public class AlbaParentController {

    private final AlbaService albaService;

    @GetMapping("/lists/{childId}")
    public ResponseEntity<ApiResponse<AlbasForParentResponseDto>> getAlbaList(
        @PathVariable Long childId) {
        AlbasForParentResponseDto albasForParentResponseDto = albaService.getParentAlbaList(
            childId);

        ApiResponse apiResponse = ApiResponse.builder().message("아르바이트 목록 조회 완료")
            .status(HttpStatus.OK.value()).data(albasForParentResponseDto).build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/completed-lists/{childId}")
    public ResponseEntity<ApiResponse> getCompletedAlbaList(@CurrentUser User user,
        @PathVariable Long childId) {
        AlbaCompletedListResponseDto completedAlbaList = albaService.getCompletedAlbaList(
            user.getUsername(), childId);

        ApiResponse apiResponse = ApiResponse.builder().message("완료한 아르바이트 목록 조회 완료")
            .status(HttpStatus.OK.value()).data(completedAlbaList).build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createAlba(
        @Valid @RequestBody AlbaCreateRequestDto albaCreateRequestDto) {
        albaService.createAlba(albaCreateRequestDto);

        ApiResponse apiResponse = ApiResponse.builder().message("아르바이트 등록 완료")
            .status(HttpStatus.CREATED.value()).data(null).build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/complete")
    public ResponseEntity<ApiResponse> acceptCompleteRequest(@CurrentUser User user,
        @Valid @RequestBody AlbaAcceptCompleteRequestDto albaAcceptCompleteRequestDto) {
        albaService.acceptCompleteRequest(user.getUsername(), albaAcceptCompleteRequestDto);

        ApiResponse apiResponse = ApiResponse.builder().message("아르바이트 상태 반영 완료")
            .status(HttpStatus.OK.value()).data(null).build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/reject")
    public ResponseEntity<ApiResponse> rejectCompleteRequest(@CurrentUser User user,
        @Valid @RequestBody AlbaRejectCompleteRequestDto albaRejectCompleteRequestDto) {
        albaService.rejectCompleteRequest(user.getUsername(), albaRejectCompleteRequestDto);

        ApiResponse apiResponse = ApiResponse.builder().message("아르바이트 상태 반영 완료")
            .status(HttpStatus.OK.value()).data(null).build();
        return ResponseEntity.ok(apiResponse);
    }
}
