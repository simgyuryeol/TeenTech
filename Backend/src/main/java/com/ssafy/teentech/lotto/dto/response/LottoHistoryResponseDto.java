package com.ssafy.teentech.lotto.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class LottoHistoryResponseDto {
    private LocalDate date;
    private Integer cost;
}
