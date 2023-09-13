package com.ssafy.teentech.accountbook.dto.request;

import lombok.Getter;

@Getter
public class AccountBookAddRequestDto {
    private Long accountBookId;
    private String consumptionType;//소비유형
}
