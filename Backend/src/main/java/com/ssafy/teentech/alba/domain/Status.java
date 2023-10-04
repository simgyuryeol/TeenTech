package com.ssafy.teentech.alba.domain;

import lombok.Getter;

@Getter
public enum Status {
    POSTED("게시"),
    IN_PROGRESS("진행"),
    WAIT_FOR_CHECK("검사 대기"),
    GIVE_UP("포기"),
    REJECT("거절"),
    COMPLETE("완료"),
    EXPIRED("만료");

    private String description;

    Status(String description) {
        this.description = description;
    }
}
