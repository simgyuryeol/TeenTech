package com.ssafy.teentech.quiz.controller;

import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.lotto.dto.request.LottoSetRequestDto;
import com.ssafy.teentech.quiz.dto.request.QuizAllowanceSettingsRequestDto;
import com.ssafy.teentech.quiz.service.QuizParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/{child_id}/quizzes")
@RequiredArgsConstructor
public class QuizParentController {

    final private QuizParentService quizParentService;

    @PostMapping("/reward/set")
    public ResponseEntity<ApiResponse> quizAllowanceSettings(@RequestBody QuizAllowanceSettingsRequestDto quizAllowanceSettingsRequestDto, @PathVariable Long child_id) {
        quizParentService.quizAllowanceSettings(quizAllowanceSettingsRequestDto, child_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("퀴즈 용돈 설정")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}
