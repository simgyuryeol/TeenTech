package com.ssafy.teentech.loan.repository;

import com.ssafy.teentech.loan.domain.Loan;
import com.ssafy.teentech.loan.dto.response.LoanApplyResponseDto;
import com.ssafy.teentech.loan.dto.response.LoanHistoryResponseDto;
import com.ssafy.teentech.loan.dto.response.LoanSummaryResponseDto;
import com.ssafy.teentech.user.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    @Query("select new com.ssafy.teentech.loan.dto.response.LoanSummaryResponseDto(l.loanId, l.title, l.balance, l.approvalDate) from Loan l where l.user = :user and l.balance > 0")
    List<LoanSummaryResponseDto> findAllByUserAndBalanceIsGreaterThanZero(@Param("user") User user);

    @Query("select new com.ssafy.teentech.loan.dto.response.LoanHistoryResponseDto(l.loanId, l.title, l.amount, l.interestRate, l.period, l.reason) from Loan l where l.user = :user and l.balance = 0")
    List<LoanHistoryResponseDto> findAllByUserAndBalanceIsEqualToZero(@Param("user") User user);

    @Query("select new com.ssafy.teentech.loan.dto.response.LoanApplyResponseDto(l.loanId, l.title, l.amount, l.interestRate, l.period, l.reason) from Loan l where l.user = :user and l.approvalDate is null")
    List<LoanApplyResponseDto> findAllByUserAndApprovalDateIsNull(@Param("user") User user);
}
