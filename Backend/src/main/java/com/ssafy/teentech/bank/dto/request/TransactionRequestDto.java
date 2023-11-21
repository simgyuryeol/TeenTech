package com.ssafy.teentech.bank.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransactionRequestDto {

    private Long withdrawAccountId;
    private String withdrawAccountNumber;
    private String withdrawAccountPassword;
    private String depositAccountNumber;
    private Long amount;
    private String content;

}
