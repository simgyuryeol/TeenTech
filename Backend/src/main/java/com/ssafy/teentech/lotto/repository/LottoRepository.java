package com.ssafy.teentech.lotto.repository;

import com.ssafy.teentech.lotto.domain.Lotto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LottoRepository extends JpaRepository<Lotto,Long> {
}
