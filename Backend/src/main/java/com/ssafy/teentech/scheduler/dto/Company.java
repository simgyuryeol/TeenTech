package com.ssafy.teentech.scheduler.dto;

import lombok.Getter;

@Getter
public enum Company {
    삼성전자("%BB%EF%BC%BA%C0%FC%C0%DA","005930"),
    LG화학("LG%C8%AD%C7%D0","051910"),
    카카오("%C4%AB%C4%AB%BF%C0","035720"),
    KB금융("KB%B1%DD%C0%B6","105560");



    private String value;
    private String code;

    Company(String value,String code ) {
        this.value = value;
        this.code = code;
    }

    public String getValue() {
        return value;
    }

    public String getCode(){
        return code;
    }
}
