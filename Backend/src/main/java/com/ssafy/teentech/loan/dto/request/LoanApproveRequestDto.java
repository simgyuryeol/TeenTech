package com.ssafy.teentech.loan.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoanApproveRequestDto {

    private Long loanId;

    private String password;

}
