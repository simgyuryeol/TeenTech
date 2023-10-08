package com.ssafy.teentech.loan.domain;

import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Repayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long repaymentId;

    @ManyToOne
    @JoinColumn(name = "loanId")
    private Loan loan;

    private LocalDate repaymentDate;

    @Min(1)
    private Integer amount;

    @Builder
    public Repayment(Loan loan, LocalDate repaymentDate, Integer amount) {
        this.loan = loan;
        this.repaymentDate = repaymentDate;
        this.amount = amount;
    }
}
