package com.ssafy.teentech.invest.dto.request;

import com.ssafy.teentech.invest.domain.Stock;
import com.ssafy.teentech.invest.domain.StocksHeld;
import com.ssafy.teentech.user.domain.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class StockHeldSaveRequestDto {

    private User user;
    private Stock stock;

    private Integer averagePrice;
    private Integer amount;

    public StocksHeld toEntity(){
         return StocksHeld.builder()
                .user(user)
                .stock(stock)
                .averagePrice(averagePrice)
                .amount(amount)
                .build();
    }
}
