package com.ssafy.teentech.quiz.repository;

import com.ssafy.teentech.quiz.domain.QuizHistory;
import com.ssafy.teentech.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizHistoryRepository extends JpaRepository<QuizHistory,Long> {
    Optional<List<QuizHistory>> findAllByUser(User user);
}
