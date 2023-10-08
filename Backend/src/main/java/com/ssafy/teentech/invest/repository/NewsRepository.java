package com.ssafy.teentech.invest.repository;

import com.ssafy.teentech.invest.domain.News;
import com.ssafy.teentech.invest.domain.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface NewsRepository extends JpaRepository<News,Long> {
    Optional<List<News>> findAllByStockAndDate(Stock stock, LocalDate date);
}
