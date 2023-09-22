package com.ssafy.teentech.lotto.controller;

import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.lotto.dto.request.LottoWinningsRequestDto;
import com.ssafy.teentech.lotto.service.LottoChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/{child_id}/lotto")
@RequiredArgsConstructor
public class LottoChildController {

    final private LottoChildService lottoChildService;

    @PostMapping("/reward")
    public ResponseEntity<ApiResponse> lottoWinnings(@RequestBody LottoWinningsRequestDto lottoWinningsRequestDto, @PathVariable Long child_id){
        lottoChildService.lottoWinnings(lottoWinningsRequestDto,child_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("복권 당첨금 받기")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}
