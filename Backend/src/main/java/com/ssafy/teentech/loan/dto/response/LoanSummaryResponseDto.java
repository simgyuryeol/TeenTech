package com.ssafy.teentech.loan.dto.response;

import java.time.LocalDate;
import lombok.Getter;

@Getter
public class LoanSummaryResponseDto {

    private Long loanId;

    private String title;

    private Integer lastBalance;

    private LocalDate maturityDate;

}
