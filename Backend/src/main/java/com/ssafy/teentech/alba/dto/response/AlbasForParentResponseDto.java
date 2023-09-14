package com.ssafy.teentech.alba.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AlbasForParentResponseDto {

    private List<AlbaResponseDto> inProgressAlbaList;
    private List<AlbaResponseDto> createdBeforeNowAlbaList;

}
