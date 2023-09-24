package com.ssafy.teentech.scheduler.dto;

import com.ssafy.teentech.invest.domain.Stock;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class StockSaveDto {
    private String companyName;
    private LocalDate date;
    private Integer price;

    public Stock toEntity(){
        return Stock.builder()
                .companyName(companyName)
                .date(date)
                .price(price)
                .build();
    }
}
