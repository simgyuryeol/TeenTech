package com.ssafy.teentech.accountbook.repository;

import com.ssafy.teentech.accountbook.domain.AccountBook;
import com.ssafy.teentech.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AccountBookRepository extends JpaRepository<AccountBook,Long> {
    // 해당 월에 해당하는 값들 조회
    @Query("SELECT ac FROM AccountBook ac WHERE month(ac.transactionDate) = :date and ac.user= :user")
    List<AccountBook> findByDate(LocalDate date, User user);

    //일차로 출력
    @Query("SELECT ac FROM AccountBook ac WHERE day (ac.transactionDate) = :date and ac.user= :user")
    List<AccountBook> findByDay(LocalDate date);

}