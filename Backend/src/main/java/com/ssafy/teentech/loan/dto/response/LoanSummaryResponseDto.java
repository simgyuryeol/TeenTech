package com.ssafy.teentech.loan.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoanSummaryResponseDto {

    private Long loanId;

    private String title;

    // 빌린 금액
    private Integer amount;

    // 계약 이자율
    private BigDecimal interestRate;

    // 남은 상환금액
    private Integer lastBalance;

    // 계약에 따른 총 상환금액
    private Integer InitialBalance;

    private LocalDate maturityDate;

    private String reason;

}
