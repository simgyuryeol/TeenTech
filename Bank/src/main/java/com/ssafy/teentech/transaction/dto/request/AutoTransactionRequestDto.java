package com.ssafy.teentech.transaction.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AutoTransactionRequestDto {

    private Long withdrawAccountId;
    private String withdrawAccountNumber;
    private String depositAccountNumber;
    private Long amount;
    private String content;
}
