package com.ssafy.teentech.deposit.dto.response;

import com.ssafy.teentech.deposit.domain.Deposit;
import com.ssafy.teentech.deposit.domain.InterestType;
import com.ssafy.teentech.user.domain.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class DepositCreateResponseDto {

    private String depositName;
    private Integer money;
    private LocalDate startDate;
    private LocalDate endDate;
    private Float interest;
    private InterestType interestType;
    private Integer maturityPaymentAmount;

    public Deposit toEntity(User user){
        return Deposit.builder()
                .depositName(depositName)
                .endDate(endDate)
                .interest(interest)
                .interestType(interestType)
                .money(money)
                .startDate(startDate)
                .user(user)
                .build();
    }
}
