package com.ssafy.teentech.invest.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class TradingRecordsResponseDto {
    private String companyName;
    private LocalDate date;
    private Integer price;
    private Integer amount;
    private Integer type;
}
