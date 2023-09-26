package com.ssafy.teentech.user.dto.request;

import com.ssafy.teentech.common.util.Role;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExtraInformationRequestDto {

    @NotNull
    private Role role;

    @NotBlank
    private String name;

    @Size(min = 4, max = 4)
    private String password;

}
