package com.ssafy.teentech.quiz.controller;

import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.quiz.dto.response.QuizHistoryResponseDto;
import com.ssafy.teentech.quiz.service.QuizChildService;
import com.ssafy.teentech.quiz.service.QuizParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
                .message("퀴즈 용돈 설정")
                .status(OK.value())
                .data(quizHistoryResponseDto)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}
