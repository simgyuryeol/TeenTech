package com.ssafy.teentech.accountbook.domain;

import com.ssafy.teentech.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

import static javax.persistence.FetchType.LAZY;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ACCOUNTBOOK")
public class AccountBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountBookId;

    private String assetType; //지출,소비
    private String content; //자산 종류
    private Integer withdrawalAmount; //출금 금액
    private Integer depositAmount;//입금금액

    private LocalDate transactionDate;//거래일자
    private LocalTime transactionTime;//거래시간
    private String consumptionType;//소비유형

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    public void setConsumptionType(String consumptionType){
        this.consumptionType = consumptionType;
    }

    @Builder
    public AccountBook(String assetType, String content, Integer withdrawalAmount, Integer depositAmount,
                       LocalDate transactionDate, LocalTime transactionTime,User user ){
        this.assetType=assetType;
        this.content = content;
        this.withdrawalAmount = withdrawalAmount;
        this.depositAmount = depositAmount;
        this.transactionDate = transactionDate;
        this.transactionTime = transactionTime;
        this.user = user;
    }
}
