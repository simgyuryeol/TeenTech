package com.ssafy.teentech.loan.dto.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoanApplyRequestDto {

    @NotBlank
    private String title;

    @Min(1)
    private Integer amount;

    @Min(1)
    private Integer period;

    private String reason;
}
