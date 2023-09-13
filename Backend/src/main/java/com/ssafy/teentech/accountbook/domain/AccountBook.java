package com.ssafy.teentech.accountbook.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ACCOUNTBOOK")
public class AccountBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountBookId;

    private String assetType; //자산 종류
    private String content;
    private Integer withdrawalAmount; //출금 금액
    private Integer depositAmount;//입금금액

    private LocalDate transactionDate;//거래일자
    private LocalTime transactionTime;//거래시간
    private String consumptionType;//소비유형

}
