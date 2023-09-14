package com.ssafy.teentech.alba.dto.request;

import java.time.LocalDate;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AlbaCreateRequestDto {

    @NotNull
    private Long childId;

    @NotNull
    private String title;

    @NotNull
    private String content;

    @NotNull
    private Integer reward;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate closeDate;
}
