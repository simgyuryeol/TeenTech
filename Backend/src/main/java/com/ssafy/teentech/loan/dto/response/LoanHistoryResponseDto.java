package com.ssafy.teentech.loan.dto.response;

import com.ssafy.teentech.loan.domain.State;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoanHistoryResponseDto {

    private Long loanId;

    private String title;

    private Integer amount;

    // 계약에 따른 상환액
    private Integer initialBalance;

    private Integer lastBalance;

    private BigDecimal interestRate;

    private Integer period;

    private String reason;

    private State state;
}
