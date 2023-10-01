package com.ssafy.teentech.loan.controller;

import com.ssafy.teentech.common.entity.CurrentUser;
import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.loan.dto.request.LoanApplyRequestDto;
import com.ssafy.teentech.loan.dto.request.RepayRequestDto;
import com.ssafy.teentech.loan.dto.response.LoanHistoryResponseDto;
import com.ssafy.teentech.loan.dto.response.LoanSummaryListResponseDto;
import com.ssafy.teentech.loan.service.LoanService;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/loans/child")
@RestController
@RequiredArgsConstructor
public class LoanChildController {

    private final LoanService loanService;

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse> getLoanSummary(@CurrentUser User user) {
        LoanSummaryListResponseDto loanSummaryListResponseDto = loanService.getLoanSummary(
            user.getUsername());

        ApiResponse apiResponse = ApiResponse.builder().status(HttpStatus.OK.value())
            .message("대출 현황 조회 완료").data(loanSummaryListResponseDto).build();

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse> getLoanHistory(@CurrentUser User user) {
        List<LoanHistoryResponseDto> loanHistoryResponseDtoList = loanService.getLoanHistory(
            user.getUsername());

        ApiResponse apiResponse = ApiResponse.builder().status(HttpStatus.OK.value())
            .message("상환 완료 대출 조회 완료").data(loanHistoryResponseDtoList).build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/apply")
    public ResponseEntity<ApiResponse> applyLoan(@CurrentUser User user,
        @Valid @RequestBody LoanApplyRequestDto loanApplyRequestDto) {
        loanService.applyLoan(loanApplyRequestDto, user.getUsername());

        ApiResponse apiResponse = ApiResponse.builder().status(HttpStatus.OK.value())
            .message("대출 신청 완료").data(null).build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/repay")
    public ResponseEntity<ApiResponse> executeRepay(@CurrentUser User user,
        @Valid @RequestBody RepayRequestDto repayRequestDto) {
        loanService.executeRepay(user.getUsername(), repayRequestDto);

        ApiResponse apiResponse = ApiResponse.builder().status(HttpStatus.OK.value())
            .message("상환 완료").data(null).build();

        return ResponseEntity.ok(apiResponse);
    }
}
