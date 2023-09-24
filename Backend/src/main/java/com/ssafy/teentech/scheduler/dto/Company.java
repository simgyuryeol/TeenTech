package com.ssafy.teentech.scheduler.dto;

import lombok.Getter;

@Getter
public enum Company {
    삼성전자("%BB%EF%BC%BA%C0%FC%C0%DA","005930"),
    SK하이닉스("SK%C7%CF%C0%CC%B4%D0%BD%BA","000660"),
    현대자동차("%C7%F6%B4%EB%C0%DA%B5%BF%C2%F7","005380");



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
