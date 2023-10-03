package com.ssafy.teentech.invest.domain;

import com.ssafy.teentech.user.domain.User;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Setter
    private Integer averagePrice;
    @Setter
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
