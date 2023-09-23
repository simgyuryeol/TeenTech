package com.ssafy.teentech.quiz.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "QUIZ")
public class Quiz {
    @Id
    @Column(name = "QUIZ_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizId;

    private Subject subject;
    private String question;
    private String choice;
    private String answer;
    private String commentary;


}
