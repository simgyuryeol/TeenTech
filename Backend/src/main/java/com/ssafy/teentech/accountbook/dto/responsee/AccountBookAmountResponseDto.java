package com.ssafy.teentech.accountbook.dto.responsee;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class AccountBookAmountResponseDto {
    private Integer pinMoney;
    private Integer job;
    private Integer quiz;
    private Integer invest;
    private Integer investConsumption;
    private Integer necessaryConsumption;
    private Integer desireConsumption;
}
