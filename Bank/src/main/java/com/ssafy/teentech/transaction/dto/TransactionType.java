package com.ssafy.teentech.transaction.dto;

import lombok.Getter;

@Getter
public enum TransactionType {
    DEPOSIT("입금"), WITHDRAW("출금");

    private String type;

    TransactionType(String type) {
        this.type = type;
    }
}
