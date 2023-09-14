package com.ssafy.teentech.alba.repository;

import com.ssafy.teentech.alba.domain.Alba;
import com.ssafy.teentech.alba.domain.Status;
import com.ssafy.teentech.user.domain.User;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbaRepository extends JpaRepository<Alba, Long> {

    List<Alba> getAllByUserAndStatusAndCloseDateIsAfter(User user, Status status, LocalDate now);

    List<Alba> getAllByUserAndCloseDateBefore(User user, LocalDate now);
}
