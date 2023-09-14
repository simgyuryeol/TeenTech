package com.ssafy.teentech.alba.domain;

import lombok.Getter;

@Getter
public enum Status {
    NOT_ACCEPTED("NOT_ACCEPTED"),
    IN_PROGRESS("DOING"),
    GIVE_UP("GIVE_UP"),
    COMPLETE("COMPLETE");

    private String description;

    Status(String description) {
        this.description = description;
    }
}
