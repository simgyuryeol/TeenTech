package com.ssafy.teentech.child.service;

import com.ssafy.teentech.bank.dto.response.AccountResponseDto;
import com.ssafy.teentech.bank.service.BankService;
import com.ssafy.teentech.child.dto.AvatarUpdate;
import com.ssafy.teentech.deposit.domain.Deposit;
import com.ssafy.teentech.deposit.repository.DepositRepository;
import com.ssafy.teentech.invest.domain.Stock;
import com.ssafy.teentech.invest.domain.StocksHeld;
import com.ssafy.teentech.invest.repository.StockRepository;
import com.ssafy.teentech.invest.repository.StocksHeldRepository;
import com.ssafy.teentech.loan.domain.Loan;
import com.ssafy.teentech.loan.repository.LoanRepository;
import com.ssafy.teentech.parent.dto.response.ChildDetailResponseDto;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChildService {
    private final ChildDetailRepository childDetailRepository;
    private final UserRepository userRepository;
    private final DepositRepository depositRepository;
    private final StocksHeldRepository stocksHeldRepository;
    private final StockRepository stockRepository;
    private final LoanRepository loanRepository;
    private final BankService bankService;

    public void avatarUpdate(AvatarUpdate avatarUpdate, Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        childDetail.setAvatarImageUrl(avatarUpdate.getAvatarImageUrl());
        childDetailRepository.save(childDetail);
    }

    public ChildDetailResponseDto childDetail(Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());


        Integer deposit =0;
        Integer stock = 0;
        Float stockRate = 0f;

        // 예금
        //List<Deposit> depositList = depositRepository.findAllByUser(user).orElseThrow(() -> new IllegalArgumentException());
        List<Deposit> depositList = depositRepository.findAllByUser(user).orElse(Collections.emptyList());
        Integer depositNumber = depositList.size();
        for (Deposit depositValue : depositList) {
            deposit+=depositValue.getMoney();
        }

        // 주식
        //List<StocksHeld> stocksHeldList = stocksHeldRepository.findAllByUser(user).orElseThrow(() -> new IllegalArgumentException());
        List<StocksHeld> stocksHeldList = stocksHeldRepository.findAllByUser(user).orElse(Collections.emptyList());

        ZonedDateTime nowDate = ZonedDateTime.now(ZoneId.of("Asia/Seoul")); //서울 오늘 날짜
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = nowDate.format(formatter);
        LocalDate Today = LocalDate.parse(formattedDate, formatter);

        for (StocksHeld stocksHeld : stocksHeldList) {
            stock += (stocksHeld.getAveragePrice()*stocksHeld.getAmount());

            Stock stockValue = stockRepository.findByCompanyNameAndDate(stocksHeld.getStock().getCompanyName(), Today).orElse(null);//.orElseThrow(() -> new IllegalArgumentException());
            if(stockValue!=null){
                stockRate += (stockValue.getPrice()*stocksHeld.getAmount());
            }

        }

        if (!stocksHeldList.isEmpty()){
            stockRate = (stock/stockRate);
        }

        // 대출
        //Loan loan = loanRepository.findLatestUncompletedLoanByUser(user).orElseThrow(() -> new IllegalArgumentException());
        Pageable pageable = PageRequest.of(0, 1); //첫번째 값만 가져오도록
        List<Loan> loans = loanRepository.findLatestUncompletedLoanByUser(user, pageable).orElse(null);
        Integer loanBalance = 0;
        Long loanDay = 0L;
        Loan loan = null;

        if(!loans.isEmpty()){
            loan = loans.get(0);
        }

        if(loan !=null){
            loanBalance = loan.getBalance();
            loanDay = ChronoUnit.DAYS.between(Today, loan.getMaturityDate());
        }

        // 유저 잔액
        Long totalBalance = 0L;
        AccountResponseDto accountInformation = bankService.getAccountInformation(user.getUserId());
        totalBalance = accountInformation.getBalance();


        /**
         * 추후 추가 필요
         * 보여주는 기준 정하고 추가
         */
        ChildDetailResponseDto childDetailResponseDto = ChildDetailResponseDto.builder()
                .username(user.getUsername())
                .totalBalance(totalBalance.intValue())
                .deposit(deposit)
                .depositNumber(depositNumber)
                .stock(stock)
                .stockRate(stockRate)
                .creditRating(childDetail.getCreditRating())
                .loanBalance(loanBalance)
                .loneDay(loanDay.intValue())
                .quizPoint(childDetail.getQuizPoint())
                .avatarImageUrl(childDetail.getAvatarImageUrl())
                .pocketMoney(childDetail.getPocketMoney())
                .pocketMoneyCycle(childDetail.getPocketMoneyCycle())
                .build();

        return childDetailResponseDto;
    }
}
