package com.ssafy.teentech.account.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AccountResponseDto {

    private String userName;
    private String accountNumber;
    private Long balance;
}
