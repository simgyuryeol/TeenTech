package com.ssafy.teentech.alba.dto.response;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AlbaCompletedResponseDto {

    private String title;

    private Integer reward;

    private LocalDate startDate;

    private LocalDate closeDate;

    private String content;
}
