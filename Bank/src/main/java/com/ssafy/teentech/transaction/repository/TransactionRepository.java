package com.ssafy.teentech.transaction.repository;

import com.ssafy.teentech.account.domain.Account;
import com.ssafy.teentech.transaction.domain.Transaction;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("select t from Transaction t where t.withdrawAccount = :account or t.depositAccount = :account")
    List<Transaction> findAllByWithdrawAccountOrDepositAccount(@Param("account") Account account, Pageable pageable);
}
