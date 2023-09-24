package com.ssafy.teentech.scheduler.dto;

import com.ssafy.teentech.invest.domain.News;
import com.ssafy.teentech.invest.domain.Stock;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class NewsSaveDto {
    private Stock stock;
    private String title;
    private String content;
    private LocalDate date;

    public News toEntity(){
        return News.builder()
                .content(content)
                .date(date)
                .stock(stock)
                .title(title)
                .build();
    }
}
