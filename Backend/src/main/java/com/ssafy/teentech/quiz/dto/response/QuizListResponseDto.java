package com.ssafy.teentech.quiz.dto.response;

import com.ssafy.teentech.quiz.domain.Subject;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class QuizListResponseDto {
    private Subject subject;
}
