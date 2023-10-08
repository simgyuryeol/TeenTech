package com.ssafy.teentech.user.dto.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AccessTokenResponseDto {
    private final String accessToken;
}
