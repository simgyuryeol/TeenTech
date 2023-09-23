package com.ssafy.teentech.quiz.service;

import com.ssafy.teentech.quiz.domain.Answer;
import com.ssafy.teentech.quiz.domain.QuizHistory;
import com.ssafy.teentech.quiz.domain.Subject;
import com.ssafy.teentech.quiz.dto.response.QuizDetailResponseDto;
import com.ssafy.teentech.quiz.dto.response.QuizHistoryResponseDto;
import com.ssafy.teentech.quiz.dto.response.QuizListResponseDto;
import com.ssafy.teentech.quiz.repository.QuizHistoryRepository;
import com.ssafy.teentech.quiz.repository.QuizRepository;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
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

    public List<QuizListResponseDto> quizList() {
        List<Subject> subjects = Arrays.asList(Subject.values());

        List<QuizListResponseDto> quizListResponseDtoList = new ArrayList<>();
        for (Subject subject : subjects){
            QuizListResponseDto quizListResponseDto = QuizListResponseDto.builder()
                    .subject(subject)
                    .build();
            quizListResponseDtoList.add(quizListResponseDto);
        }

        return quizListResponseDtoList;
    }

    public QuizDetailResponseDto quizDetail(Long childId,Subject subject) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        List<QuizHistory> quizHistories = quizHistoryRepository.findAllByUserAndQuizSubject(user, subject).orElseThrow(() -> new IllegalArgumentException());

        Integer correctProblem = 0;
        Integer wrongProblem =0;
        Integer point = 0;

        for (QuizHistory quizHistory : quizHistories) {
            if(quizHistory.getAnswer()== Answer.CORRECT){
                correctProblem+=1;
            }
            else{
                wrongProblem+=1;
            }
            point+=quizHistory.getPoint();
        }

        QuizDetailResponseDto quizDetailResponseDto = QuizDetailResponseDto.builder()
                .correctProblem(correctProblem)
                .wrongProblem(wrongProblem)
                .point(point)
                .build();

        return quizDetailResponseDto;

    }


}
