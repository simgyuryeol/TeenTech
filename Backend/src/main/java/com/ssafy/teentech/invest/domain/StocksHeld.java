package com.ssafy.teentech.invest.domain;

import com.ssafy.teentech.invest.domain.Stock;
import com.ssafy.teentech.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "STOCKSHELD")
public class StocksHeld {
    @Id
    @Column(name = "STOCKSH_ELD_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stocksHeldId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stockId")
    private Stock stock;

    private Integer averagePrice;
    private Integer amount;

    @Builder
    public StocksHeld(Integer amount, Integer averagePrice,User user, Stock stock){
        this.stocksHeldId = null;
        this.user= user;
        this.stock = stock;
        this.averagePrice = averagePrice;
        this.amount = amount;
    }
}
