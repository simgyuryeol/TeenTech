package com.ssafy.teentech.lotto.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class LottoTicketResponseDto {
    private Integer lotteryCoupon;
    private Integer totalLotteryPrize;
}
