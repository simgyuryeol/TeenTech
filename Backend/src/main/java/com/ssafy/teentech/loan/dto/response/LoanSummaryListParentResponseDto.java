package com.ssafy.teentech.loan.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoanSummaryListParentResponseDto {

    private Integer totalInProgressLoanCount;

    private Integer totalLoanBalance;

    private Integer loanLimitation;

    private List<LoanApplyResponseDto> applyLoanList;

    private List<LoanSummaryResponseDto> inProgressLoanList;

}
