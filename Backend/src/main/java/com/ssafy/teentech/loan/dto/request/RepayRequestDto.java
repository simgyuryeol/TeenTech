package com.ssafy.teentech.loan.dto.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RepayRequestDto {

    @NotNull
    private Long loanId;

    @Min(1)
    private Integer amount;

    @Size(min = 4, max = 4)
    private String password;
}
