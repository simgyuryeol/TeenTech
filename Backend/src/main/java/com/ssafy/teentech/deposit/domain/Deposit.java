package com.ssafy.teentech.deposit.domain;

import com.ssafy.teentech.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "DEPOSIT")
public class Deposit {
    @Id
    @Column(name = "DEPOSIT_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer depositId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    private String depositName;
    private Integer money;
    private LocalDate startDate;
    private LocalDate endDate;
    private Float interest;

    @Enumerated(EnumType.STRING)
    private InterestType interestType;

    @Builder
    public Deposit(User user,String depositName, Integer money, LocalDate startDate, LocalDate endDate, Float interest, InterestType interestType ){
        this.depositId = null;
        this.user = user;
        this.depositName =depositName;
        this.money = money;
        this.startDate = startDate;
        this.endDate = endDate;
        this.interest = interest;
        this.interestType = interestType;
    }

}
