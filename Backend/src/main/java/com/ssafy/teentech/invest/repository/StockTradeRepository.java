package com.ssafy.teentech.invest.repository;

import com.ssafy.teentech.invest.domain.StockTrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockTradeRepository extends JpaRepository<StockTrade,Long> {
}
