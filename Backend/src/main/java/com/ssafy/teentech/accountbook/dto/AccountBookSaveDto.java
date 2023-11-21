package com.ssafy.teentech.accountbook.dto;

import com.ssafy.teentech.accountbook.domain.AccountBook;
import com.ssafy.teentech.user.domain.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder(toBuilder = true)
public class AccountBookSaveDto {
    String assetType;
    String content;
    Integer withdrawalAmount;
    Integer depositAmount;
    LocalDate transactionDate;
    LocalTime transactionTime;
    User user;

    public AccountBook toEntity(){
        return AccountBook.builder()
                .assetType(assetType)
                .content(content)
                .depositAmount(depositAmount)
                .withdrawalAmount(withdrawalAmount)
                .transactionDate(transactionDate)
                .transactionTime(transactionTime)
                .user(user)
                .build();
    }
}
