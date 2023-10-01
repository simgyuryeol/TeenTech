package com.ssafy.teentech.loan.domain;

import lombok.Getter;

@Getter
public enum State {
    APPLY("신청"),
    REJECT("거절"),
    ACCEPT("승인"),
    COMPLETE("상환완료"),
    FAIL("상환실패");

    private String description;

    State(String description) {
        this.description = description;
    }
}
