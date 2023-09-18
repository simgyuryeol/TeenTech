package com.ssafy.teentech.invest.dto;

import com.ssafy.teentech.user.domain.User;
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

    private Integer volume;
    private LocalDate tradeDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stockId")
    private Stock stock;
}
