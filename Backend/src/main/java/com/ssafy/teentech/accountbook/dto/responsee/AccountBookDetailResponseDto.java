package com.ssafy.teentech.accountbook.dto.responsee;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;


@Getter
@Builder(toBuilder = true)
public class AccountBookDetailResponseDto {
    private Long accountBookId;
    private String assetType; //자산 종류
    private String content;
    private Integer withdrawalAmount; //출금 금액
    private Integer depositAmount;//입금금액

    private LocalTime transactionTime;//거래시간
    private String consumptionType;//소비유형
}
