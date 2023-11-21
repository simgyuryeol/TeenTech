package com.ssafy.teentech.invest.repository;

import com.ssafy.teentech.invest.domain.Stock;
import com.ssafy.teentech.invest.domain.StocksHeld;
import com.ssafy.teentech.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StocksHeldRepository extends JpaRepository<StocksHeld,Long> {
    Optional<List<StocksHeld>> findAllByUser(User user);

    Optional<StocksHeld> findByStockAndUser(Stock stock, User user);
}
