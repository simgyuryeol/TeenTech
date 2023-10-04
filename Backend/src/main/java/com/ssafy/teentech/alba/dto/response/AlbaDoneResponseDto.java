package com.ssafy.teentech.alba.dto.response;

import com.ssafy.teentech.alba.domain.Status;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AlbaDoneResponseDto {

    private String title;

    private String content;

    private Integer reward;

    private LocalDate startDate;

    private LocalDate closeDate;

    private Status status;
}
