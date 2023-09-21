package com.ssafy.teentech.transaction.dto.response;

import com.ssafy.teentech.transaction.dto.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransactionResponseDto {

    private Long transactionId;
    private TransactionType type;
    private String userName; // 이체 대상(상대방) 이름
    private Long balanceAfterTransaction;
    private Long TransferAmount;
    private String content;

}
