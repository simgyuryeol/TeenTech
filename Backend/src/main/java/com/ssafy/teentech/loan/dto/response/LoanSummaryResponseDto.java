package com.ssafy.teentech.loan.dto.response;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoanSummaryResponseDto {

    private Long loanId;

    private String title;

    private Integer amount;

    private Integer lastBalance;

    private LocalDate maturityDate;

}
