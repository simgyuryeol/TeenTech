package com.ssafy.teentech.deposit.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "DEPOSITTRANSACTION")
public class DepositTransaction {
    @Id
    @Column(name = "TRANSACTION_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "depositId")
    private Deposit deposit;

    private LocalTime depositTime;
    private Integer depositMoney;


}
