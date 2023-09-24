package com.ssafy.teentech.user.repository;

import com.ssafy.teentech.user.domain.User;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findByOauthId(String oauthId);

    Optional<List<User>> findAllByParentId(Long parentId);
}
