package com.ssafy.teentech.invest.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder(toBuilder = true)
public class StockInquiryDetailResponseDto {

    List<Stock> stockList;
    List<News> newsList;

    @Getter
    @Builder(toBuilder = true)
    public static class Stock {
        private String companyName;
        private LocalDate stockDate;
        private Integer price;
    }

    @Getter
    @Builder(toBuilder = true)
    public static class News {
        private String title;
        private String content;
        private LocalDate newsDate;
    }

}
