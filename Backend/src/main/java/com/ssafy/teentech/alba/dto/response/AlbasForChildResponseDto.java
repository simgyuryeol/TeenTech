package com.ssafy.teentech.alba.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AlbasForChildResponseDto {

    private List<AlbaResponseDto> inProgressAlbaList;
    private List<AlbaResponseDto> applicableAlbaList;

}
