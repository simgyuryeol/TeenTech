package com.ssafy.teentech.user.controller;

import static org.springframework.http.HttpStatus.OK;

import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.common.util.CookieUtil;
import com.ssafy.teentech.common.util.HeaderUtil;
import com.ssafy.teentech.common.util.JwtService;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.dto.response.UserInfoResponseDto;
import com.ssafy.teentech.common.util.TokenInfo;
import com.ssafy.teentech.user.dto.response.AccessTokenResponseDto;
import com.ssafy.teentech.user.service.UserService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping
    public ResponseEntity<ApiResponse> getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        UserInfoResponseDto userInfoResponseDto = new UserInfoResponseDto(user.getNickname(), user.getProfileImageUrl());

        ApiResponse apiResponse = ApiResponse.builder()
            .message("회원정보")
            .status(OK.value())
            .data(userInfoResponseDto)
            .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/reissue")
    public ResponseEntity<ApiResponse> reissueAccessToken(HttpServletRequest request,
        HttpServletResponse response) {
        String accessToken = HeaderUtil.getAccessToken(request);
        String refreshToken = CookieUtil.getCookie(request, "refresh_token")
            .orElseThrow(() -> new RuntimeException()).getValue();
        TokenInfo tokenInfo = jwtService.reissueToken(accessToken, refreshToken);

        CookieUtil.addCookie(response, "refresh_token", tokenInfo.getRefreshToken(),
            60 * 60 * 24 * 7);

        ApiResponse apiResponse = ApiResponse.builder()
            .message("access token reissued")
            .status(OK.value())
            .data(new AccessTokenResponseDto(tokenInfo.getAccessToken()))
            .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletRequest request) {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        String accessToken = HeaderUtil.getAccessToken(request);
        String refreshToken = CookieUtil.getCookie(request, "refresh_token")
            .orElseThrow(() -> new RuntimeException()).getValue();

        jwtService.logout(user.getEmail(), accessToken, refreshToken);

        ApiResponse apiResponse = ApiResponse.builder()
            .message("로그아웃 성공")
            .status(OK.value())
            .build();
        return ResponseEntity.ok(apiResponse);
    }

    /**
     * 회원 탈퇴
     */
    @DeleteMapping
    public ResponseEntity<ApiResponse> deleteUser(HttpServletRequest request) {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        String accessToken = HeaderUtil.getAccessToken(request);
        String refreshToken = CookieUtil.getCookie(request, "refresh_token")
            .orElseThrow(() -> new RuntimeException()).getValue();

        jwtService.logout(user.getEmail(), accessToken, refreshToken);

        userService.deleteUser(principal.getUsername());

        ApiResponse apiResponse = ApiResponse.builder()
            .message("회원 탈퇴 성공")
            .status(OK.value())
            .data(null)
            .build();

        return ResponseEntity.ok(apiResponse);
    }
}
