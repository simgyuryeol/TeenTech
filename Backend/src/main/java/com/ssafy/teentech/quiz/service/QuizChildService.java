package com.ssafy.teentech.quiz.service;

import com.ssafy.teentech.quiz.domain.Answer;
import com.ssafy.teentech.quiz.domain.Quiz;
import com.ssafy.teentech.quiz.domain.QuizHistory;
import com.ssafy.teentech.quiz.domain.Subject;
import com.ssafy.teentech.quiz.dto.request.QuizHistorySaveDto;
import com.ssafy.teentech.quiz.dto.request.QuizMoneyTransfer;
import com.ssafy.teentech.quiz.dto.response.QuizDetailResponseDto;
import com.ssafy.teentech.quiz.dto.response.QuizHistoryResponseDto;
import com.ssafy.teentech.quiz.dto.response.QuizListResponseDto;
import com.ssafy.teentech.quiz.repository.QuizHistoryRepository;
import com.ssafy.teentech.quiz.repository.QuizRepository;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizChildService {

    final private UserRepository userRepository;
    final private ChildDetailRepository childDetailRepository;
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


    /**
     * 1. 퀴즈 내역에 저장
     * 2. 이체 로직 실행
     */
    public void quizMoneyTransfer(QuizMoneyTransfer quizMoneyTransfer, Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        //1. 퀴즈 내역에 저장
        List<QuizHistory> quizHistorySaveDtoList = new ArrayList<>();

        for(QuizMoneyTransfer.QuizData quizData :quizMoneyTransfer.getQuizList()){
            Quiz quiz = quizRepository.findById(quizData.getQuizId()).orElseThrow(() -> new IllegalArgumentException());

            QuizHistorySaveDto quizHistorySaveDto = QuizHistorySaveDto.builder()
                    .answer(quizData.getAnswer())
                    .quiz(quiz)
                    .date(quizMoneyTransfer.getDate())
                    .point(childDetail.getQuizPoint())
                    .user(user)
                    .build();

            quizHistorySaveDtoList.add(quizHistorySaveDto.toEntity());
        }

        quizHistoryRepository.saveAll(quizHistorySaveDtoList);


        //2. 이체 로직
    }
}
