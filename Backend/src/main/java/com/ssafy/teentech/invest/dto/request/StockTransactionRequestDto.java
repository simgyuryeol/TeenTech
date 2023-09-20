package com.ssafy.teentech.invest.dto.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class StockTransactionRequestDto {
    private String companyName;
    private Integer price;
    private Integer amount;
    private LocalDate date;
}
