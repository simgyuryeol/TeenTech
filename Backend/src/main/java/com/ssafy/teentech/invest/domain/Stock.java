package com.ssafy.teentech.invest.domain;

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
}
