package com.ssafy.teentech.accountbook.dto.responsee;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class AccountBookDateResponseDto {
    private Integer spendingAmount;
    private Integer importAmount;
    private LocalDate date;

}
