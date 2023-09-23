package com.ssafy.teentech.bank.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@AllArgsConstructor
public class TransactionResponseDto {
    private Long transactionId;
    private String type;
    private String userName; // 이체 대상(상대방) 이름
    private Long balanceAfterTransaction;
    private Long transferAmount;
    private String content;

}
