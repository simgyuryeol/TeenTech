package com.ssafy.teentech.quiz.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class QuizDetailResponseDto {
    private Integer correctProblem;
    private Integer wrongProblem;
    private Integer point;
}
