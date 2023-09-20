package com.ssafy.teentech.invest.controller;


import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.invest.dto.request.StockInquiryDetailsRequestDto;
import com.ssafy.teentech.invest.dto.request.StockTransactionRequestDto;
import com.ssafy.teentech.invest.dto.response.CheckStockHoldingsResponseDto;
import com.ssafy.teentech.invest.dto.response.StockInquiryDetailResponseDto;
import com.ssafy.teentech.invest.service.InvestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/{child_id}/investments")
@RequiredArgsConstructor
public class InvestController {
    private final InvestService investService;
    @GetMapping()
    public ResponseEntity<ApiResponse> checkStockHoldings(@PathVariable Long child_id){
        List<CheckStockHoldingsResponseDto> stockHoldingsResponseDtoList = investService.checkStockHoldings(child_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("보유 주식 조회")
                .status(OK.value())
                .data(stockHoldingsResponseDtoList)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/sell")
    public ResponseEntity<ApiResponse> stockSell(@RequestBody StockTransactionRequestDto stockSellRequestDto, @PathVariable Long child_id){

        investService.stockSell(stockSellRequestDto,child_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("보유 주식 판매")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/buy")
    public ResponseEntity<ApiResponse> stockBuy(@RequestBody StockTransactionRequestDto stockSellRequestDto, @PathVariable Long child_id){

        investService.stockBuy(stockSellRequestDto,child_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("보유 주식 구매")
                .status(OK.value())
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/detail")
    public ResponseEntity<ApiResponse> stockInquiryDetails(@RequestBody StockInquiryDetailsRequestDto stockInquiryDetailsRequestDto, @PathVariable Long child_id){

        StockInquiryDetailResponseDto stockInquiryDetailResponseDto = investService.stockInquiryDetails(stockInquiryDetailsRequestDto, child_id);

        ApiResponse apiResponse = ApiResponse.builder()
                .message("주식 종목 상세 보기")
                .status(OK.value())
                .data(stockInquiryDetailResponseDto)
                .build();
        return ResponseEntity.ok(apiResponse);
    }



}
