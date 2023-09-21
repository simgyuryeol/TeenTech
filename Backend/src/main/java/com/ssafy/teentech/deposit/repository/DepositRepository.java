package com.ssafy.teentech.deposit.repository;

import com.ssafy.teentech.deposit.domain.Deposit;
import com.ssafy.teentech.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepositRepository extends JpaRepository<Deposit,Long> {
    Optional<List<Deposit>> findAllByUser(User user);
}
