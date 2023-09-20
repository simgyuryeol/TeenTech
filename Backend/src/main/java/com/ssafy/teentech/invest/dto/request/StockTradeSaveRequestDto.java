package com.ssafy.teentech.invest.dto.request;

import com.ssafy.teentech.invest.domain.Stock;
import com.ssafy.teentech.invest.domain.StockTrade;
import com.ssafy.teentech.user.domain.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class StockTradeSaveRequestDto {
    private User user;
    private Stock stock;
    private Integer amount;
    private Integer price;
    private LocalDate tradeDate;
    private Integer type;

    public StockTrade toEntity(){
        return StockTrade.builder()
                .amount(amount)
                .stock(stock)
                .price(price)
                .tradeDate(tradeDate)
                .user(user)
                .type(type)
                .build();
    }
}
