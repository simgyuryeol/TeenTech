package com.ssafy.teentech.common.util;

import com.ssafy.teentech.common.jwt.JwtTokenProvider;
import java.time.Duration;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class JwtService {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;

    private static final String LOGOUT = "logout";

    public TokenInfo reissueToken(String requestAccessToken, String requestRefreshToken) {
        if (!jwtTokenProvider.validateToken(requestAccessToken)) {
            throw new RuntimeException();
        }

        if (!jwtTokenProvider.validateToken(requestRefreshToken)) {
            throw new RuntimeException();
        }

        if (LOGOUT.equals(redisService.getValues(requestAccessToken))) {
            throw new RuntimeException("이미 로그아웃된 토큰");
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(requestAccessToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtTokenProvider.generateToken(authentication);
    }

    public void logout(String userEmail, String accessToken, String refreshToken) {
        if (!jwtTokenProvider.validateToken(accessToken)) {
            throw new RuntimeException();
        }
        if (LOGOUT.equals(redisService.getValues(accessToken))) {
            throw new RuntimeException("이미 로그아웃된 토큰");
        }

        Long time = jwtTokenProvider.getTokenExpirationTime(accessToken) - new Date().getTime();

        redisService.setValues(accessToken, "logout", Duration.ofMillis(time));
        redisService.deleteValues(userEmail);
    }
}
