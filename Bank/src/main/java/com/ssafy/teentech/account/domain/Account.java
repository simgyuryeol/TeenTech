package com.ssafy.teentech.account.domain;

import com.ssafy.teentech.common.domain.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import lombok.Getter;

@Getter
@Entity
@Table(name = "ACCOUNT")
public class Account extends BaseEntity {

    @Id
    @Column(name = "ACCOUNT_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(name = "USER_NAME")
    @Size(min = 2, max = 12)
    private String userName;

    @Column(name = "ACCOUNT_NUMBER")
    private String accountNumber;

    @Column(name = "BALANCE")
    private Long balance;

    @Column(name = "PASSWORD")
    @Size(min = 4, max = 4)
    private String password;

}
