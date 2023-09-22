package com.ssafy.teentech.lotto.domain;

import com.ssafy.teentech.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "LOTTO")
public class Lotto {
    @Id
    @Column(name = "LOTTO_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lottoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    private LocalDate date;
    private Integer winnings;

}
