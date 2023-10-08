package com.ssafy.teentech.lotto.repository;

import com.ssafy.teentech.lotto.domain.Lotto;
import com.ssafy.teentech.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LottoRepository extends JpaRepository<Lotto,Long> {
    Optional<List<Lotto>> findAllByUser(User user);
}
