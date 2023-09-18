package com.ssafy.teentech.invest.dto;

import com.ssafy.teentech.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    private Integer investmentAmount;
    private Integer count;
}
