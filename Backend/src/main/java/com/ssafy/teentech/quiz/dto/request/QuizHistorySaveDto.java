package com.ssafy.teentech.quiz.dto.request;

import com.ssafy.teentech.quiz.domain.Answer;
import com.ssafy.teentech.quiz.domain.Quiz;
import com.ssafy.teentech.quiz.domain.QuizHistory;
import com.ssafy.teentech.user.domain.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class QuizHistorySaveDto {
    private User user;
    private Quiz quiz;
    private LocalDate date;
    private Integer point;
    private String answer;

    public QuizHistory toEntity(){
        return QuizHistory.builder()
                .point(point)
                .answer(answer)
                .date(date)
                .quiz(quiz)
                .user(user)
                .build();
    }
}
