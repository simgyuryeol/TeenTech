package com.ssafy.teentech.loan.domain;

import com.ssafy.teentech.user.domain.User;
import java.math.BigDecimal;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @Size(min = 1, max = 20)
    private String title;

    // 빌리고자 신청한 금액
    @Min(1)
    private Integer amount;

    private Integer period;

    private String reason;

    // 승인일
    private LocalDate approvalDate;

    // 만기일
    private LocalDate maturityDate;

    // 신청 이자율에 따른 상환액
    private Integer initialBalance;

    // 상환 잔액
    private Integer balance;

    // 상환완료일
    private LocalDate repaymentCompletionDate;

    @Column(precision = 3, scale = 1)   // 전체 자릿수는 세자리, 소수점은 한자리
    private BigDecimal interestRate;

    @Enumerated(EnumType.STRING)
    private State state;

    @Builder
    public Loan(User user, String title, Integer amount, Integer period, String reason,
        BigDecimal interestRate, State state) {
        this.user = user;
        this.title = title;
        this.amount = amount;
        this.period = period;
        this.reason = reason;
        this.interestRate = interestRate;
        this.state = state;
    }

    public void updateInitialBalance(Integer initialBalance) {
        this.initialBalance = initialBalance;
    }

    public void updateBalance(Integer balance) {
        this.balance = balance;
    }

    public void updateApprovalDate(LocalDate approvalDate) {
        this.approvalDate = approvalDate;
    }

    public void updateMaturityDate(LocalDate maturityDate) {
        this.maturityDate = maturityDate;
    }

    public void updateRepaymentCompletionDate(LocalDate repaymentCompletionDate) {
        this.repaymentCompletionDate = repaymentCompletionDate;
    }

    public void updateState(State state) {
        this.state = state;
    }
}
