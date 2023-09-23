package com.ssafy.teentech.quiz.repository;

import com.ssafy.teentech.quiz.domain.Quiz;
import com.ssafy.teentech.quiz.domain.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Long> {
    Optional<List<Quiz>> findAllBySubject(Subject subject);
}
