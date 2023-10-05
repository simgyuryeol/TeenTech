package com.ssafy.teentech.common.util;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.stream.Stream;
import lombok.Getter;

@Getter
public enum Role {
    USER,
    PARENT,
    CHILD;

    @JsonCreator
    public static Role parsing(String inputValue) {
        return Stream.of(Role.values())
            .filter(role -> role.toString().equals(inputValue.toUpperCase()))
            .findFirst()
            .orElse(null);
    }
}
