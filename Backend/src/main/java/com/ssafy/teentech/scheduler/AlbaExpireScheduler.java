package com.ssafy.teentech.scheduler;

import com.ssafy.teentech.alba.domain.Alba;
import com.ssafy.teentech.alba.domain.Status;
import com.ssafy.teentech.alba.repository.AlbaRepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class AlbaExpireScheduler {

    private final AlbaRepository albaRepository;

    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void albaExpireSchedule() {
        LocalDate nowDate = LocalDate.now(ZoneId.of("Asia/Seoul")); //서울 오늘 날짜

        List<Alba> notAcceptedAndNotCompletedList = albaRepository.findAllByCloseDateIsBeforeAndPostOrInProgress(
            nowDate, Status.POSTED, Status.IN_PROGRESS);

        notAcceptedAndNotCompletedList.forEach((alba) -> alba.updateStatus(Status.EXPIRED));
    }
}
