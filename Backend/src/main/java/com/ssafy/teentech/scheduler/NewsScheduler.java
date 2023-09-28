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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class NewsScheduler {
    private final NewsRepository newsRepository;
    private final StockRepository stockRepository;

    // GPT-3 API 키
    @Value("${gpt.server.key}")
    private String apiKey;
    // GPT-3 요청 URL
    private static String apiUrl = "https://api.openai.com/v1/engines/text-davinci-003/completions";

    @Scheduled(cron = "0 0 16 * * *") //매일 오후 4시에 실행
//    @Scheduled(cron = "0 31 * * * *")
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

            //for (int page = 1; page < 10; page++) {
                String News_URL = "https://finance.naver.com/news/news_search.naver?rcdate=0&q=" + CompanyName.getValue() + "&x=26&y=15&sm=all.basic&pd=4&stDateStart=" + formattedDate + "&stDateEnd=" + formattedDate + "&page=" + 1;

                try {
                    Document doc = Jsoup.connect(News_URL).get();
                    Elements select = doc.select("#contentarea_left > div.newsSchResult._replaceNewsLink > dl");

                    if (select.isEmpty()) { //값이 없을 경우 종료, 해당 페이지에는 뉴스가 없음
                        break;
                    }

                    //뉴스 목록에서 링크 찾기
                    Elements select1 = select.select("dd.articleSubject");
                    int count = 0; //뉴스 2개만
                    for (Element element : select1) { //element 1개당 뉴스 기사 1개
                        count++;
                        if(count>2){
                            break;
                        }

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
                        System.out.println(textBuilder.length());
                        //뉴스 내용 gpt로 쉽게 만들기
                        if(textBuilder.length()>1500){
                            count--;
                            continue;
                        }
                        String gpt_news = gpt(apiKey, apiUrl,textBuilder.toString());


                        //뉴스 날짜
                        Stock stock = stockRepository.findByCompanyNameAndDate(CompanyName.name(),LocalDate.parse(formattedDate, formatter)).orElseThrow(() -> new IllegalArgumentException());


                        NewsSaveDto newsSaveDto = NewsSaveDto.builder()
                                .content(gpt_news)
                                .title(title.text())
                                .date(LocalDate.parse(formattedDate, formatter))
                                .stock(stock)
                                .build();

                        newsList.add(newsSaveDto.toEntity());
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }

           // } //페이지 반복문 끝
        }//회사 반복문 끝

        // 3일 전꺼는 삭제
        List<News> newsAll = newsRepository.findAll();

        for (News news : newsAll) {
            int days = (int)ChronoUnit.DAYS.between(news.getDate(), LocalDate.parse(formattedDate, formatter));
            if(days>3){
                newsRepository.delete(news);
            }
        }

        newsRepository.saveAll(newsList);

    }

    private static String gpt(String apiKey, String apiUrl,String news) {

        System.out.println(news);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        // GPT-3 요청 바디 설정
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("prompt", "이 뉴스 기사를 어린이들이 이해할 수 있도록 간단하게 300자내로 바꿔줘: `" + news + "`");
        requestBody.put("max_tokens", 1000); // 최대 길이 조절

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // GPT-3에 요청 보내기
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> responseEntity = restTemplate.postForObject(apiUrl, requestEntity, Map.class);

        System.out.println(responseEntity);

        ArrayList<Map<String, String>> choices = (ArrayList<Map<String, String>>) responseEntity.get("choices");
        String transformedArticle = choices.get(0).get("text");
        System.out.println(transformedArticle);
//        System.out.println("변환된 뉴스");
//        System.out.println(transformedArticle);

        return transformedArticle;
    }
}
