package com.ssafy.teentech.loan.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoanSummaryListResponseDto {

    private Integer creditRating;

    private Integer totalInProgressLoanCount;

    private Integer totalLoanBalance;

    private List<LoanSummaryResponseDto> inProgressLoanList;
}
