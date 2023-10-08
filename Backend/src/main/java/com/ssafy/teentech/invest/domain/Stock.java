package com.ssafy.teentech.invest.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "STOCK")
public class Stock {
    @Id
    @Column(name = "STOCK_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockId;

    private String companyName;
    private LocalDate date;
    private Integer price;

    @Builder
    public Stock(String companyName, LocalDate date, Integer price){
        this.stockId=null;
        this.companyName = companyName;
        this.date = date;
        this.price=price;
    }
}
