package com.ssafy.teentech.transaction.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransactionRequestDto {

    // 이체(내가 누군가에게 돈을 보내는 행위)
    // 출금계좌(나) - 입금계좌(상대방)
    private Long withdrawAccountId;
    private String withdrawAccountNumber;
    private String withdrawAccountPassword;
    private String depositAccountNumber;
    private Long amount;
    private String content;
}
