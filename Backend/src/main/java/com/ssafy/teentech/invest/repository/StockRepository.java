package com.ssafy.teentech.invest.repository;

import com.ssafy.teentech.invest.domain.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock,Long> {
    Optional<Stock> findByCompanyName(String companyName);
}
