package com.ssafy.teentech.invest.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import lombok.Getter;

@Getter
public class StockTransactionRequestDto {

    private String companyName;
    private Integer amount;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
}
