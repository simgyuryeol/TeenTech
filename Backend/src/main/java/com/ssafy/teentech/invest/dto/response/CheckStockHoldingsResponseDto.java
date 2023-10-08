package com.ssafy.teentech.invest.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class CheckStockHoldingsResponseDto {
    private String companyName;
    private Integer amount;
    private Integer averagePrice;

}
