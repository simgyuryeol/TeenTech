package com.ssafy.teentech.scheduler;

import com.ssafy.teentech.deposit.domain.Deposit;
import com.ssafy.teentech.deposit.repository.DepositRepository;
import com.ssafy.teentech.deposit.service.DepositService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DepositExpiration {
    private final DepositRepository depositRepository;
    private final DepositService depositService;

    @Scheduled(cron = "0 0 9 * * *") // 매일
    public void depositExpiration(){
        ZonedDateTime nowDate = ZonedDateTime.now(ZoneId.of("Asia/Seoul")); //서울 오늘 날짜
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = nowDate.format(formatter);


        List<Deposit> all = depositRepository.findAll();

        for (Deposit deposit : all) {
            // 두 날짜를 비교합니다.
            int comparisonResult = deposit.getEndDate().compareTo(LocalDate.parse(formattedDate, formatter));

            if(comparisonResult<=0){ //같거나 이후 날짜면 예금 만료 된 것으로 판단하여 이체 실행한다.
                /**
                 * 1. 자식에게 예금을 이체해준다.
                 * 2. 예금을 삭제한다.
                 */
                depositService.depositExpiration(deposit.getUser().getUserId(), deposit.getDepositId());
            }
        }


    }
}
