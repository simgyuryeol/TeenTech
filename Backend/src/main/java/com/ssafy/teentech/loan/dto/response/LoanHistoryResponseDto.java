package com.ssafy.teentech.loan.dto.response;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoanHistoryResponseDto {

    private Long loanId;

    private String title;

    private Integer balance;

    private BigDecimal interestRate;

    private Integer period;

    private String reason;
}
