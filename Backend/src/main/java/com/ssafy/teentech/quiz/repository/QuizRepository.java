package com.ssafy.teentech.quiz.repository;

import com.ssafy.teentech.quiz.domain.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Long> {

}
