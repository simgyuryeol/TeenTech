package com.ssafy.teentech.deposit.dto.request;

import com.ssafy.teentech.deposit.domain.InterestType;
import lombok.Getter;

@Getter
public class DepositCreateRequestDto {
    private Integer money;
    private Integer weeks;
    private String depositName;
    private InterestType interestType;
}
