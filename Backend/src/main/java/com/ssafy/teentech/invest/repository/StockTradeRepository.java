package com.ssafy.teentech.invest.repository;

import com.ssafy.teentech.invest.domain.Stock;
import com.ssafy.teentech.invest.domain.StockTrade;
import com.ssafy.teentech.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockTradeRepository extends JpaRepository<StockTrade,Long> {
    Optional<List<StockTrade>> findAllByUser(User user);
}
