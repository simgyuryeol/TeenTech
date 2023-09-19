package com.ssafy.teentech.invest.repository;

import com.ssafy.teentech.invest.domain.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News,Long> {
}
