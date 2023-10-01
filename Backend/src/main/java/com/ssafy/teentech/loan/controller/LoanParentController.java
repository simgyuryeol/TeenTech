package com.ssafy.teentech.loan.controller;

import com.ssafy.teentech.common.entity.CurrentUser;
import com.ssafy.teentech.common.response.ApiResponse;
import com.ssafy.teentech.loan.dto.request.LoanApproveRequestDto;
import com.ssafy.teentech.loan.dto.request.LoanRejectRequestDto;
import com.ssafy.teentech.loan.dto.response.LoanHistoryResponseDto;
import com.ssafy.teentech.loan.dto.response.LoanSummaryListParentResponseDto;
import com.ssafy.teentech.loan.service.LoanService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/loans/parent")
@RestController
@RequiredArgsConstructor
public class LoanParentController {

    private final LoanService loanService;

    @GetMapping("/summary/{childId}")
    public ResponseEntity<ApiResponse> getChildLoanSummary(@CurrentUser User user,
        @PathVariable Long childId) {

        LoanSummaryListParentResponseDto loanSummaryListParentResponseDto = loanService.getChildLoanSummary(
            user.getUsername(), childId);

        ApiResponse apiResponse = ApiResponse.builder().status(HttpStatus.OK.value())
            .message("자녀 대출 현황 조회 완료").data(loanSummaryListParentResponseDto).build();

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/history/{childId}")
    public ResponseEntity<ApiResponse> getChildLoanHistory(@CurrentUser User user,
        @PathVariable Long childId) {

        List<LoanHistoryResponseDto> childLoanHistoryResponseDtoList = loanService.getChildLoanHistory(
            user.getUsername(), childId);

        ApiResponse apiResponse = ApiResponse.builder().status(HttpStatus.OK.value())
            .message("상환 완료 대출 조회 완료").data(childLoanHistoryResponseDtoList).build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/approve")
    public ResponseEntity<ApiResponse> approveLoanRequest(@CurrentUser User user,
        @RequestBody LoanApproveRequestDto approveOrRejectRequestDto) {

        loanService.approveLoan(user.getUsername(), approveOrRejectRequestDto);

        ApiResponse apiResponse = ApiResponse.builder().status(HttpStatus.OK.value())
            .message("대출 승인 완료").data(null).build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/reject")
    public ResponseEntity<ApiResponse> rejectLoanRequest(@CurrentUser User user,
        @RequestBody LoanRejectRequestDto loanRejectRequestDto) {

        loanService.rejectLoan(user.getUsername(), loanRejectRequestDto);

        ApiResponse apiResponse = ApiResponse.builder().status(HttpStatus.OK.value())
            .message("대출 거절 완료").data(null).build();

        return ResponseEntity.ok(apiResponse);
    }
}
