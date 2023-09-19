package com.ssafy.teentech.invest.dto.request;

import lombok.Getter;

@Getter
public class StockSellRequestDto {
    private String companyName;
    private Integer price;
    private Integer amount;
}
