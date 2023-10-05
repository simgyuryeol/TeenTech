package com.ssafy.teentech.quiz.service;

import com.ssafy.teentech.bank.dto.request.AutoTransactionRequestDto;
import com.ssafy.teentech.bank.dto.response.AccountResponseDto;
import com.ssafy.teentech.bank.service.BankService;
import com.ssafy.teentech.quiz.domain.Answer;
import com.ssafy.teentech.quiz.domain.Quiz;
import com.ssafy.teentech.quiz.domain.QuizHistory;
import com.ssafy.teentech.quiz.domain.Subject;
import com.ssafy.teentech.quiz.dto.request.QuizHistorySaveDto;
import com.ssafy.teentech.quiz.dto.request.QuizMoneyTransfer;
import com.ssafy.teentech.quiz.dto.response.QuizDetailResponseDto;
import com.ssafy.teentech.quiz.dto.response.QuizGetResponseDto;
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
import java.util.Collections;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class QuizChildService {

    final private UserRepository userRepository;
    final private ChildDetailRepository childDetailRepository;
    final private QuizHistoryRepository quizHistoryRepository;
    final private QuizRepository quizRepository;
    final private BankService bankService;

    public QuizHistoryResponseDto quizHistory(Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        List<QuizHistory> quizHistories = quizHistoryRepository.findAllByUser(user).orElseThrow(() -> new IllegalArgumentException());

        Integer correct = 0;
        Integer incorrect = 0;
        Integer point = 0;

        for (QuizHistory quizHistory : quizHistories) {
            if(quizHistory.getAnswer().equals(quizHistory.getQuiz().getAnswer())){
                correct+=1;
                point+=quizHistory.getPoint();
            }
            else{
                incorrect+=1;
            }
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
            if(quizHistory.getAnswer().equals(quizHistory.getQuiz().getAnswer())){
                correctProblem+=1;
                point+=quizHistory.getPoint();
            }
            else{
                wrongProblem+=1;
            }
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
        Long amount = 0L;

        //1. 퀴즈 내역에 저장
        List<QuizHistory> quizHistorySaveDtoList = new ArrayList<>();

        for(QuizMoneyTransfer.quiz quizData :quizMoneyTransfer.getQuiz()){
            Quiz quiz = quizRepository.findById(quizData.getQuizId()).orElseThrow(() -> new IllegalArgumentException());

            if(quizData.getAnswer().equals(quiz.getAnswer())){
                amount+=(childDetail.getQuizPoint());
            }

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
        AccountResponseDto depositInformation = bankService.getAccountInformation(childId);
        String depositAccountNumber = depositInformation.getAccountNumber();

        AccountResponseDto withdrawInformation = bankService.getAccountInformation(user.getParentId());
        String withdrawAccountNumber = withdrawInformation.getAccountNumber();


        AutoTransactionRequestDto autoTransactionRequestDto = new AutoTransactionRequestDto(
                childId,
                withdrawAccountNumber,
                depositAccountNumber,
                amount,
                "퀴즈"
        );

        bankService.autoTransfer(autoTransactionRequestDto);
    }

    /**
     * 해당 주제에 맞는 퀴즈를 찾아서 랜덤으로 5개 리턴해줌
     * 1. 주제에 맞는 모든 퀴즈 리스트 들고옴
     * 2. 랜덤으로섞에서 처음부터 5개 리턴
     *  데이터가 많을 경우 모든 데이터를 메모리에 로딩해야 하므로 성능 문제가 발생할 수 잇음. 리팩토링 해보자
     */
    public List<QuizGetResponseDto> quizGet(Subject subject) {
        List<Quiz> quizList = quizRepository.findAllBySubject(subject).orElseThrow(() -> new IllegalArgumentException());
        Collections.shuffle(quizList);

        List<QuizGetResponseDto> quizGetResponseDtoList = new ArrayList<>();

        for (Quiz quiz : quizList.subList(0, Math.min(quizList.size(), 5))){
            QuizGetResponseDto quizGetResponseDto = QuizGetResponseDto.builder()
                    .quizId(quiz.getQuizId())
                    .commentary(quiz.getCommentary())
                    .choice(quiz.getChoice())
                    .question(quiz.getQuestion())
                    .answer(quiz.getAnswer())
                    .build();

            quizGetResponseDtoList.add(quizGetResponseDto);
        }

        return quizGetResponseDtoList;

    }
}
