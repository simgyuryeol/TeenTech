package com.ssafy.teentech.parent.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class ChildDetailResponseDto {
    private String username;

}
