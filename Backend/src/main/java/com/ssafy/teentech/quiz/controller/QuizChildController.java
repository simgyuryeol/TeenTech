package com.ssafy.teentech.quiz.controller;

import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.quiz.domain.Subject;
import com.ssafy.teentech.quiz.dto.response.QuizDetailResponseDto;
import com.ssafy.teentech.quiz.dto.response.QuizHistoryResponseDto;
import com.ssafy.teentech.quiz.dto.response.QuizListResponseDto;
import com.ssafy.teentech.quiz.service.QuizChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/{child_id}/quizzes")
@RequiredArgsConstructor
public class QuizChildController {
    final private QuizChildService quizChildService;

    @GetMapping("/histories")
    public ResponseEntity<ApiResponse> quizHistory(@PathVariable Long child_id){
        QuizHistoryResponseDto quizHistoryResponseDto = quizChildService.quizHistory(child_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("퀴즈 내역 조회")
                .status(OK.value())
                .data(quizHistoryResponseDto)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping()
    public ResponseEntity<ApiResponse> quizList(){
        List<QuizListResponseDto> quizListResponseDtoList = quizChildService.quizList();

        ApiResponse apiResponse = ApiResponse.builder()
                .message("퀴즈 목록 조회")
                .status(OK.value())
                .data(quizListResponseDtoList)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("{subject}")
    public ResponseEntity<ApiResponse> quizDetail(@PathVariable Long child_id, @PathVariable Subject subject){
        QuizDetailResponseDto quizDetailResponseDto = quizChildService.quizDetail(child_id,subject);


        ApiResponse apiResponse = ApiResponse.builder()
                .message("퀴즈 상세 조회")
                .status(OK.value())
                .data(quizDetailResponseDto)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

}
