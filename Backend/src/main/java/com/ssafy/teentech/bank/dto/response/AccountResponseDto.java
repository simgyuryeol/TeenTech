package com.ssafy.teentech.bank.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@AllArgsConstructor
public class AccountResponseDto {

    private String userName;
    private String accountNumber;
    private Long balance;
}
