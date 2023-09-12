package com.ssafy.teentech.common.util;

import lombok.Getter;

@Getter
public enum Role {
    ROLE_USER("사용자"),
    ROLE_PARENT("부모"),
    ROLE_CHILD("자식");

    private String description;

    Role(String description) {
        this.description = description;
    }
}
