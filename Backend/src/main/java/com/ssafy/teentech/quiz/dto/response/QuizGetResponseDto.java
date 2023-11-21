package com.ssafy.teentech.quiz.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class QuizGetResponseDto {
    private Long quizId;
    private String question;
    private String choice;
    private String answer;
    private String commentary;

}
