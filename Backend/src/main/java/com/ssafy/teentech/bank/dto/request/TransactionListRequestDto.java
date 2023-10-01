package com.ssafy.teentech.bank.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransactionListRequestDto {

    private Long userId;
    private String accountNumber;

}
