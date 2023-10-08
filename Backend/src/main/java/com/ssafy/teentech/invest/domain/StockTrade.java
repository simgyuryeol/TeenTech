package com.ssafy.teentech.invest.domain;

import com.ssafy.teentech.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "STOCKTRADE")

public class StockTrade {
    @Id
    @Column(name = "STOCK_TRADE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockTradeId;

    private Integer amount;
    private Integer price;
    private LocalDate tradeDate;
    private Integer type;
    private Integer averagePrice; //평단가


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stockId")
    private Stock stock;

    @Builder
    public StockTrade(Integer amount, Integer price, LocalDate tradeDate, User user,Stock stock,Integer type, Integer averagePrice){
        this.stockTradeId = null;
        this.amount=amount;
        this.price=price;
        this.tradeDate = tradeDate;
        this.user = user;
        this.stock = stock;
        this.type = type;
        this.averagePrice = averagePrice;
    }
}
