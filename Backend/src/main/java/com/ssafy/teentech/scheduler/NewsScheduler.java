package com.ssafy.teentech.scheduler;

import com.ssafy.teentech.invest.domain.News;
import com.ssafy.teentech.invest.domain.Stock;
import com.ssafy.teentech.invest.repository.NewsRepository;
import com.ssafy.teentech.invest.repository.StockRepository;
import com.ssafy.teentech.scheduler.dto.Company;
import com.ssafy.teentech.scheduler.dto.NewsSaveDto;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
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
public class NewsScheduler {
    private final NewsRepository newsRepository;
    private final StockRepository stockRepository;

    @Scheduled(cron = "0 0 16 * * *") //매일 오후 4시에 실행
    //@Scheduled(cron = "0/50 * * * * *")
    public void newsSave(){
        List<News> newsList = new ArrayList<>();


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

            for (int page = 1; page < 10; page++) {
                String News_URL = "https://finance.naver.com/news/news_search.naver?rcdate=0&q=" + CompanyName.getValue() + "&x=26&y=15&sm=all.basic&pd=4&stDateStart=" + formattedDate + "&stDateEnd=" + formattedDate + "&page=" + page;

                try {
                    Document doc = Jsoup.connect(News_URL).get();
                    Elements select = doc.select("#contentarea_left > div.newsSchResult._replaceNewsLink > dl");

                    if (select.isEmpty()) { //값이 없을 경우 종료, 해당 페이지에는 뉴스가 없음
                        break;
                    }

                    //뉴스 목록에서 링크 찾기
                    Elements select1 = select.select("dd.articleSubject");
                    for (Element element : select1) { //element 1개당 뉴스 기사 1개
                        Element aElement = element.selectFirst("a");
                        String href = aElement.attr("href");

                        Document newsDoc = Jsoup.connect("https://finance.naver.com" + href).get();
                        String scriptElement = newsDoc.select("script").first().html();

                        // 링크 한번 더 받아오기 (리다이렉트 되는 링크로)
                        String hrefValue = scriptElement.split("'")[1];

                        Document textdoc = Jsoup.connect(hrefValue).get(); // 뉴스 기사 링크 안에 값

                        // 뉴스 제목
                        Elements title = textdoc.select("#title_area > span");
                        System.out.println(title.text());

                        // 뉴스 내용
                        Elements brTags = textdoc.select("#dic_area");

                        StringBuilder textBuilder = new StringBuilder();
                        for (Element brtag : brTags) {
                            String text = brtag.ownText().trim(); // 태그 내부의 텍스트 추출
                            if (!text.isEmpty()) {
                                textBuilder.append(text).append(" "); // 텍스트를 StringBuilder에 추가
                            }
                        }

                        System.out.println(textBuilder);

                        //뉴스 날짜
                        Elements date = textdoc.select("#ct > div.media_end_head.go_trans > div.media_end_head_info.nv_notrans > div.media_end_head_info_datestamp > div:nth-child(1) > span");
                        System.out.println(date.text());

                        Stock stock = stockRepository.findByCompanyNameAndDate(CompanyName.name(),LocalDate.parse(formattedDate, formatter)).orElseThrow(() -> new IllegalArgumentException());


                        NewsSaveDto newsSaveDto = NewsSaveDto.builder()
                                .content(textBuilder.toString())
                                .title(title.text())
                                .date(LocalDate.parse(formattedDate, formatter))
                                .stock(stock)
                                .build();

                        newsList.add(newsSaveDto.toEntity());


                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }

            } //페이지 반복문 끝
        }//회사 반복문 끝

        newsRepository.saveAll(newsList);

    }
}
