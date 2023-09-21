package com.ssafy.teentech.deposit.dto.response;

import com.ssafy.teentech.deposit.domain.InterestType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class DepositInquiryResponseDto {
    private String depositName;
    private Integer money;
    private LocalDate startDate;
    private LocalDate endDate;
    private Float interest;
    private InterestType interestType;
    private Integer maturityPaymentAmount;
}
