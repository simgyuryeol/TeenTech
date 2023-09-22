package com.ssafy.teentech.lotto.controller;

import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.lotto.dto.request.LottoSetRequestDto;
import com.ssafy.teentech.lotto.service.LottoParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/{child_id}/lotto")
@RequiredArgsConstructor
public class LottoParentController {

    private final LottoParentService lottoParentService;

    @PostMapping("/reward/set")
    public ResponseEntity<ApiResponse> lottoSet(@RequestBody LottoSetRequestDto lottoSetRequestDto, @PathVariable Long child_id){

        lottoParentService.lottoSet(lottoSetRequestDto,child_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("복권 당첨금 설정")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }




}
