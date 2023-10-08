package com.ssafy.teentech.quiz.dto.request;

import com.ssafy.teentech.quiz.domain.Answer;
import com.ssafy.teentech.quiz.domain.Subject;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class QuizMoneyTransfer {
    private Subject subject;
    private LocalDate date;
    private List<quiz> quiz;

    @Getter
    public static class quiz {
        private Long quizId;
        private String answer;
    }

}
