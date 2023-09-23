package com.ssafy.teentech.quiz.service;

import com.ssafy.teentech.quiz.domain.Answer;
import com.ssafy.teentech.quiz.domain.QuizHistory;
import com.ssafy.teentech.quiz.dto.response.QuizHistoryResponseDto;
import com.ssafy.teentech.quiz.repository.QuizHistoryRepository;
import com.ssafy.teentech.quiz.repository.QuizRepository;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizChildService {

    final private UserRepository userRepository;
    final private QuizHistoryRepository quizHistoryRepository;
    final private QuizRepository quizRepository;

    public QuizHistoryResponseDto quizHistory(Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        List<QuizHistory> quizHistories = quizHistoryRepository.findAllByUser(user).orElseThrow(() -> new IllegalArgumentException());

        Integer correct = 0;
        Integer incorrect = 0;
        Integer point = 0;

        for (QuizHistory quizHistory : quizHistories) {
            if(quizHistory.getAnswer()== Answer.CORRECT){
                correct+=1;
            }
            else{
                incorrect+=1;
            }
            point+=quizHistory.getPoint();
        }


        QuizHistoryResponseDto quizHistoryResponseDto = QuizHistoryResponseDto.builder()
                .correctProblem(correct)
                .wrongProblem(incorrect)
                .point(point)
                .build();
        return quizHistoryResponseDto;
    }
}
