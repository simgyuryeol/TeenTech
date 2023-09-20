package com.ssafy.teentech.invest.dto.request;

import lombok.Getter;

@Getter
public class StockTransactionRequestDto {
    private String companyName;
    private Integer price;
    private Integer amount;
}
