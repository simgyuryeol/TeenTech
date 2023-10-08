package com.ssafy.teentech.invest.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "NEWS")
public class News {
    @Id
    @Column(name = "NEWS_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long newsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stockId")
    private Stock stock;

    private String title;
    @Column(name = "content", columnDefinition = "LONGTEXT")
    private String content;
    private LocalDate date;

    @Builder
    public News(Stock stock, String title, String content, LocalDate date){
        this.newsId=null;
        this.stock = stock;
        this.title=title;
        this.content = content;
        this.date = date;
    }
}
