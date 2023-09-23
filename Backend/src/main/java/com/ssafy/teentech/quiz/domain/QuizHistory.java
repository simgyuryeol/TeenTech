package com.ssafy.teentech.quiz.domain;

import com.ssafy.teentech.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "QUIZ_HISTORY")
public class QuizHistory {
    @Id
    @Column(name = "QUIZ_HISTORY_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizHistoryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    private LocalDate date;
    private Integer point;
    private Answer answer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quizId")
    private Quiz quiz;

}
