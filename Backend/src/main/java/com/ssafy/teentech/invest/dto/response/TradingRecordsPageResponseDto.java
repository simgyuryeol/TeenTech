package com.ssafy.teentech.invest.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder(toBuilder = true)
public class TradingRecordsPageResponseDto {
    List<TradingRecordsResponseDto> tradingRecordsResponseDtoList;
    private Integer totalInvestment;
    private Integer totalNetProfit;
    private Float rateOfReturn;
}
