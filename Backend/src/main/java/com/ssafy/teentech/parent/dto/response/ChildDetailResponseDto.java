package com.ssafy.teentech.parent.dto.response;

import com.ssafy.teentech.common.util.Cycle;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class ChildDetailResponseDto {
    private String username;
    private Integer totalBalance;
    private Integer deposit;
    private Integer depositNumber;
    private Integer stock;
    private float stockRate;
    private Integer creditRating;
    private Integer loanBalance;
    private Integer loneDay;
    private Integer quizPoint;
    private String avatarImageUrl;
    private Integer pocketMoney;
    private Cycle pocketMoneyCycle;
}
