package com.ssafy.teentech.user.repository;

import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChildDetailRepository extends JpaRepository<ChildDetail,Long> {
    Optional<ChildDetail> findByUser(User user);
}
