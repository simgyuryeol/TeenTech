package com.ssafy.teentech.parent.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class ChildGetResponseDto {
    private Long childId;
    private String childName;
}
