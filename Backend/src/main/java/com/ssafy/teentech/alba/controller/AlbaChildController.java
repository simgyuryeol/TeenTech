package com.ssafy.teentech.alba.controller;

import static org.springframework.http.HttpStatus.OK;

import com.ssafy.teentech.alba.dto.response.AlbasForChildResponseDto;
import com.ssafy.teentech.alba.service.AlbaService;
import com.ssafy.teentech.common.entity.CurrentUser;
import com.ssafy.teentech.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/albas/child")
@RequiredArgsConstructor
public class AlbaChildController {

    private final AlbaService albaService;

    @GetMapping("/lists")
    public ResponseEntity<ApiResponse<AlbasForChildResponseDto>> getAlbaList(
        @CurrentUser User user) {
        AlbasForChildResponseDto albasForChildResponseDto = albaService.getChildAlbaList(
            user.getUsername());

        ApiResponse apiResponse = ApiResponse.builder().message("아르바이트 목록 조회 완료")
            .status(HttpStatus.OK.value()).data(albasForChildResponseDto).build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/{albaId}/accept")
    public ResponseEntity<ApiResponse> acceptAlba(@PathVariable Long albaId,
        @CurrentUser User user) {
        albaService.acceptAlba(user.getUsername(), albaId);

        ApiResponse apiResponse = ApiResponse.builder()
            .message("아르바이트 수락 완료.")
            .status(OK.value())
            .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/{albaId}/complete")
    public ResponseEntity<ApiResponse> albaCompleteRequest(@PathVariable Long albaId,
        @CurrentUser User user) {
        albaService.albaCompleteRequest(user.getUsername(), albaId);

        ApiResponse apiResponse = ApiResponse.builder()
            .message("아르바이트 완료 검수 요청 성공")
            .status(OK.value())
            .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/{albaId}/giveup")
    public ResponseEntity<ApiResponse> giveUpAlba(@PathVariable Long albaId,
        @CurrentUser User user) {
        albaService.giveUpAlba(user.getUsername(), albaId);

        ApiResponse apiResponse = ApiResponse.builder()
            .message("아르바이트 포기 완료.")
            .status(OK.value())
            .build();
        return ResponseEntity.ok(apiResponse);
    }
}
