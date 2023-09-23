package com.ssafy.teentech.quiz.domain;

import lombok.Getter;

@Getter
public enum Subject {
    MONEY("돈,화폐"),
    SAVING("저축,지출,소득"),
    INVEST("투자,펀드"),
    PRICE("물가"),
    TAX("세금");

    private String description;

    Subject(String description) {
        this.description = description;
    }

}
