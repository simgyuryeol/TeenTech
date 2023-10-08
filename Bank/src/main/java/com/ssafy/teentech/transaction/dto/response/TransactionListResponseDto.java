package com.ssafy.teentech.transaction.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransactionListResponseDto {

    private List<TransactionResponseDto> transactions;

}
