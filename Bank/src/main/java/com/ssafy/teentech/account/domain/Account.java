package com.ssafy.teentech.account.domain;

import com.ssafy.teentech.common.domain.BaseEntity;
import com.ssafy.teentech.common.error.ErrorCode;
import com.ssafy.teentech.common.error.exception.AccountException;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "ACCOUNT")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account extends BaseEntity {

    @Id
    @Column(name = "ACCOUNT_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(name = "USER_NAME")
    @Size(min = 2, max = 12)
    private String userName;

    @Column(name = "ACCOUNT_NUMBER", unique = true)
    private String accountNumber;

    @Column(name = "BALANCE")
    private Long balance;

    @Column(name = "PASSWORD")
    @Size(min = 4, max = 4)
    private String password;

    @Builder
    public Account(String userName, String accountNumber, Long balance, String password) {
        this.userName = userName;
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.password = password;
    }

    public void updateUserName(String userName) {
        this.userName = userName;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void checkOwner(Long id) {
        if (!this.accountId.equals(id)) {
            throw new AccountException(ErrorCode.NOT_OWNER_OF_ACCOUNT);
        }
    }

    public void checkPassword(String password) {
        if (!this.password.equals(password)) {
            throw new AccountException(ErrorCode.ACCOUNT_PASSWORD_MISMATCH);
        }
    }

    public void deposit(Long amount) {
        this.balance += amount;
    }

    public void withdraw(Long amount) {
        if (this.balance < amount) {
            throw new AccountException(ErrorCode.WITHDRAW_OVER_BALANCE);
        }

        this.balance -= amount;
    }

}
