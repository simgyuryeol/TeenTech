package com.ssafy.teentech.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreditAndInterestResponseDto {

    private Integer creditRating;

    private float depositInterestRate;

    private float loanInterestRate;
}
