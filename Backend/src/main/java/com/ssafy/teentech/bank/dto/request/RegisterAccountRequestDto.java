package com.ssafy.teentech.bank.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RegisterAccountRequestDto {

    private Long userId;

    @NotBlank
    private String userName;

    @Size(min = 4, max = 4)
    private String password;
}
