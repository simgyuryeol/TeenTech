package com.ssafy.teentech.scheduler;

import com.ssafy.teentech.loan.domain.Loan;
import com.ssafy.teentech.loan.domain.State;
import com.ssafy.teentech.loan.repository.LoanRepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class LoanScheduler {

    private final LoanRepository loanRepository;

    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void loanRepaymentFail() {
        LocalDate nowDate = LocalDate.now(ZoneId.of("Asia/Seoul")); //서울 오늘 날짜

        List<Loan> unRepayedLoanList = loanRepository.findAllByMaturityDateIsBeforeAndState(
            nowDate, State.ACCEPT);

        unRepayedLoanList.forEach((loan) -> {
            if (loan.getBalance().equals(0)) {
                loan.updateState(State.COMPLETE);
            } else {
                loan.updateState(State.FAIL);
            }
        });
    }
}
