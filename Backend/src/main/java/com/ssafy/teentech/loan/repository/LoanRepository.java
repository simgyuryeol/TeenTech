package com.ssafy.teentech.loan.repository;

import com.ssafy.teentech.loan.domain.Loan;
import com.ssafy.teentech.loan.domain.State;
import com.ssafy.teentech.loan.dto.response.LoanApplyResponseDto;
import com.ssafy.teentech.loan.dto.response.LoanHistoryResponseDto;
import com.ssafy.teentech.loan.dto.response.LoanSummaryResponseDto;
import com.ssafy.teentech.user.domain.User;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    @Query("select new com.ssafy.teentech.loan.dto.response.LoanSummaryResponseDto(l.loanId, l.title, l.amount, l.interestRate, l.balance, l.initialBalance, l.maturityDate, l.reason) from Loan l where l.user = :user and l.balance > 0 and l.state = :state")
    List<LoanSummaryResponseDto> findAllByUserAndBalanceIsGreaterThanZeroAndState(
        @Param("user") User user, @Param("state")
    State state);

//    @Query("select new com.ssafy.teentech.loan.dto.response.LoanHistoryResponseDto(l.loanId, l.title, l.amount, l.interestRate, l.period, l.reason) from Loan l where l.user = :user and l.balance = 0")
//    List<LoanHistoryResponseDto> findAllByUserAndBalanceIsEqualToZero(@Param("user") User user);

    @Query("select new com.ssafy.teentech.loan.dto.response.LoanHistoryResponseDto(l.loanId, l.title, l.amount, l.initialBalance, l.interestRate, l.period, l.reason, l.state) from Loan l where l.user = :user and (l.state = :reject or l.state = :complete or l.state = :fail)")
    List<LoanHistoryResponseDto> findAllByUserAndRejectOrCompleteOrFail(@Param("user") User user,
        @Param("reject") State reject, @Param("complete") State complete,
        @Param("fail") State fail);

    @Query("select new com.ssafy.teentech.loan.dto.response.LoanApplyResponseDto(l.loanId, l.title, l.amount, l.interestRate, l.period, l.reason) from Loan l where l.user = :user and l.approvalDate is null and l.state = :state")
    List<LoanApplyResponseDto> findAllByUserAndApprovalDateIsNullAndState(@Param("user") User user,
        @Param("state") State state);

    @Query("SELECT l FROM Loan l WHERE l.user = :user AND l.maturityDate IS NOT NULL AND l.repaymentCompletionDate IS NULL ORDER BY l.maturityDate DESC")
    Optional<Loan> findLatestUncompletedLoanByUser(@Param("user") User user);

    List<Loan> findAllByMaturityDateIsBeforeAndState(LocalDate now, State state);
}
