package com.ssafy.teentech.lotto.dto.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class LottoWinningsRequestDto {
    private LocalDate date;
    private Integer cost;
    private Integer success; //0이면 성공 1이면 실패
}
