package com.ssafy.teentech.parent.dto.request;

import com.ssafy.teentech.common.util.Cycle;
import lombok.Getter;

@Getter
public class SetUpPinMoneyRequestDto {
    private Integer pinMoney;
    private Cycle cycle;
}
