package com.ssafy.teentech.common.fcm.controller;

import static org.springframework.http.HttpStatus.OK;

import com.ssafy.teentech.common.fcm.dto.request.FCMNotificationRequestDto;
import com.ssafy.teentech.common.fcm.dto.request.FCMTokenRequestDto;
import com.ssafy.teentech.common.fcm.service.FCMNotificationService;
import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.common.util.RedisService;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
class FCMController {

    private final FCMNotificationService fcmNotificationService;
    private final UserService userService;
    private final RedisService redisService;

    @PostMapping
    public ResponseEntity<ApiResponse> sendNotificationByToken(
        @RequestBody FCMNotificationRequestDto fcmNotificationRequestDto) {
        fcmNotificationService.sendNotificationByToken(fcmNotificationRequestDto);

        ApiResponse apiResponse = ApiResponse.builder()
            .message("푸시 알림 발송 완료.")
            .status(OK.value())
            .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/save/token")
    public ResponseEntity<ApiResponse> saveFCMToken(
        @RequestBody FCMTokenRequestDto fcmTokenRequestDto) {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        redisService.setValues("FCM_" + user.getUserId(),
            fcmTokenRequestDto.getFcmToken());

        ApiResponse apiResponse = ApiResponse.builder()
            .message("FCM 토큰 저장 완료.")
            .status(OK.value())
            .build();
        return ResponseEntity.ok(apiResponse);
    }
}