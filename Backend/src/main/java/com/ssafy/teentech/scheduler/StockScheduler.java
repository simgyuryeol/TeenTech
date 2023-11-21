package com.ssafy.teentech.scheduler;

import com.ssafy.teentech.invest.domain.Stock;
import com.ssafy.teentech.invest.repository.StockRepository;
import com.ssafy.teentech.scheduler.dto.Company;
import com.ssafy.teentech.scheduler.dto.StockSaveDto;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class StockScheduler {

    private final StockRepository stockRepository;


    @Scheduled(cron = "0 30 15 * * *") //매일 오후 3시30분에 실행
//    @Scheduled(cron = "0 30 * * * *")
    public void stockSave(){

        List<Stock> stockList = new ArrayList<>();

        ZonedDateTime nowDate = ZonedDateTime.now(ZoneId.of("Asia/Seoul")); //서울 오늘 날짜
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = nowDate.format(formatter);

        // URL 인코딩을 수행하여 문자열에 적용
        try {
            formattedDate = URLEncoder.encode(formattedDate, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        for (Company CompanyName :Company.values()) {
            try{
                String stockUrl = "https://finance.naver.com/item/news.naver?code="+CompanyName.getCode()+"&sm=title_entity_id.basic";
                Document doc = Jsoup.connect(stockUrl).get();
                Elements select = doc.select("#chart_area > div.rate_info > div > p.no_today > em");

                String stock_price = select.text().split(" ")[0];
                int price = Integer.parseInt(stock_price.replace(",", ""));
                price/=100;

                StockSaveDto stockSaveDto = StockSaveDto.builder()
                        .companyName(CompanyName.name())
                        .date(LocalDate.parse(formattedDate, formatter))
                        .price(price)
                        .build();

                stockList.add(stockSaveDto.toEntity());

            }catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        stockRepository.saveAll(stockList);

    }
}
