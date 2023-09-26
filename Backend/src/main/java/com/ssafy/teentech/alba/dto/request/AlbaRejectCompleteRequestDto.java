package com.ssafy.teentech.alba.dto.request;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AlbaRejectCompleteRequestDto {

    @NotNull
    private Long childId;

    @NotNull
    private Long albaId;
}
