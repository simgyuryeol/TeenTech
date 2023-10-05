package com.ssafy.teentech.quiz.domain;

import com.ssafy.teentech.user.domain.User;
import lombok.Builder;
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
    private String answer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quizId")
    private Quiz quiz;


    @Builder
    public QuizHistory(User user, LocalDate date, Integer point, String answer, Quiz quiz){
        this.quizHistoryId=null;
        this.user = user;
        this.date=date;
        this.point=point;
        this.answer=answer;
        this.quiz = quiz;
    }

}
