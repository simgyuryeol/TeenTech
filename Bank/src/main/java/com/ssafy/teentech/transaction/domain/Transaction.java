package com.ssafy.teentech.transaction.domain;

import com.ssafy.teentech.account.domain.Account;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "withdrawAccount_account_accountNumber")
    private Account withdrawAccount;

    private Long balanceAfterWithdraw;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "depositAccount_account_accountNumber")
    private Account depositAccount;

    private Long balanceAfterDeposit;

    @Min(1)
    private Long transferAmount;

    @Size(max = 20)
    private String content;

    @Builder
    public Transaction(Account withdrawAccount, Long balanceAfterWithdraw, Account depositAccount,
        Long balanceAfterDeposit, Long transferAmount, String content) {
        this.withdrawAccount = withdrawAccount;
        this.balanceAfterWithdraw = balanceAfterWithdraw;
        this.depositAccount = depositAccount;
        this.balanceAfterDeposit = balanceAfterDeposit;
        this.transferAmount = transferAmount;
        this.content = content;
    }

}
