package com.ssafy.teentech.lotto.dto;

import com.ssafy.teentech.lotto.domain.Lotto;
import com.ssafy.teentech.user.domain.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class LottoSaveDto {
    private User user;
    private LocalDate date;
    private Integer winnings;

    public Lotto toEntity(){
        return Lotto.builder()
                .user(user)
                .date(date)
                .winnings(winnings)
                .build();
    }
}
