package com.ssafy.teentech.common.util;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.stream.Stream;
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

    @JsonCreator
    public static Role parsing(String inputValue) {
        return Stream.of(Role.values())
            .filter(role -> role.toString().equals(inputValue.toUpperCase()))
            .findFirst()
            .orElse(null);
    }
}
