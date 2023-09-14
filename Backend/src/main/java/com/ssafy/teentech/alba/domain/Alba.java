package com.ssafy.teentech.alba.domain;

import com.ssafy.teentech.user.domain.User;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "ALBA")
public class Alba {

    @Id
    @Column(name = "ALBA_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long albaId;

    // 자식의 userId
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @Column(name = "TITLE")
    @NotNull
    private String title;

    @Column(name = "CONTENT")
    @NotNull
    private String content;

    @Column(name = "REWARD")
    @Min(0)
    private Integer reward;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate closeDate;

    @Column(name = "STATUS")
    @Enumerated(EnumType.STRING)
    private Status status;

    @Builder
    public Alba(User user, String title, String content, Integer reward, LocalDate startDate,
        LocalDate closeDate, Status status) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.reward = reward;
        this.startDate = startDate;
        this.closeDate = closeDate;
        this.status = status;
    }

    public void updateStatus(Status status) {
        this.status = status;
    }

}