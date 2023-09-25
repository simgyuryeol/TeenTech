package com.ssafy.teentech.parent.service;

import com.ssafy.teentech.deposit.domain.Deposit;
import com.ssafy.teentech.deposit.repository.DepositRepository;
import com.ssafy.teentech.invest.domain.Stock;
import com.ssafy.teentech.invest.domain.StocksHeld;
import com.ssafy.teentech.invest.repository.StockRepository;
import com.ssafy.teentech.invest.repository.StocksHeldRepository;
import com.ssafy.teentech.loan.domain.Loan;
import com.ssafy.teentech.loan.repository.LoanRepository;
import com.ssafy.teentech.parent.dto.request.*;
import com.ssafy.teentech.parent.dto.response.ChildDetailResponseDto;
import com.ssafy.teentech.parent.dto.response.ChildGetResponseDto;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ParentService {

    private final ChildDetailRepository childDetailRepository;
    private final UserRepository userRepository;
    private final DepositRepository depositRepository;
    private final StocksHeldRepository stocksHeldRepository;
    private final StockRepository stockRepository;
    private final LoanRepository loanRepository;

    public void setUpPinMoney(SetUpPinMoneyRequestDto setUpPinMoney, Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        childDetail.setPocketMoney(setUpPinMoney.getPinMoney());
        childDetail.setPocketMoneyCycle(setUpPinMoney.getCycle());

        childDetailRepository.save(childDetail);
    }

    public void sendPinMoney(SendPinMoneyRequestDto sendPinMoney, Long childId, Long parentId) {
        //이체 로직
    }

    public List<ChildGetResponseDto> childGet(Long parentId) {
        List<User> userList = userRepository.findAllByParentId(parentId).orElseThrow(() -> new IllegalArgumentException());

        List<ChildGetResponseDto> childGetResponseDtoList = new ArrayList<>();
        for (User user : userList) {
            ChildGetResponseDto childGetResponseDto = ChildGetResponseDto.builder()
                    .childId(user.getUserId())
                    .childName(user.getUsername())
                    .build();

            childGetResponseDtoList.add(childGetResponseDto);
        }

        return childGetResponseDtoList;
    }


    public void childAdd(ChildAddRequestDto childAddRequestDto, Long parentId) {
        User user = userRepository.findByInviteCode(childAddRequestDto.getInviteCode()).orElseThrow(() -> new IllegalArgumentException());

        user.setParentId(parentId);
        userRepository.save(user);
    }

    public void childDelete(ChildDeleteRequestDto childDeleteRequestDto) {
        User user = userRepository.findByInviteCode(childDeleteRequestDto.getInviteCode()).orElseThrow(() -> new IllegalArgumentException());
        user.setParentId(null);

        // 유저 잔액 부모한테 이체 로직
    }

    public ChildDetailResponseDto childDetail(Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        Integer deposit =0;
        Integer stock = 0;
        Float stockRate = 0f;

        // 예금
        List<Deposit> depositList = depositRepository.findAllByUser(user).orElseThrow(() -> new IllegalArgumentException());

        for (Deposit depositValue : depositList) {
            deposit+=depositValue.getMoney();
        }

        // 주식
        List<StocksHeld> stocksHeldList = stocksHeldRepository.findAllByUser(user).orElseThrow(() -> new IllegalArgumentException());
        ZonedDateTime nowDate = ZonedDateTime.now(ZoneId.of("Asia/Seoul")); //서울 오늘 날짜
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = nowDate.format(formatter);
        LocalDate Today = LocalDate.parse(formattedDate, formatter);

        for (StocksHeld stocksHeld : stocksHeldList) {
            stock += (stocksHeld.getAveragePrice()*stocksHeld.getAmount());

            Stock stockValue = stockRepository.findByCompanyNameAndDate(stocksHeld.getStock().getCompanyName(), Today).orElseThrow(() -> new IllegalArgumentException());
            stockRate += (stockValue.getPrice()*stocksHeld.getAmount());
        }

        stockRate = (stock/stockRate);


        // 대출
        Loan loan = loanRepository.findLatestUncompletedLoanByUser(user).orElseThrow(() -> new IllegalArgumentException());
        Period period = Period.between(Today, loan.getMaturityDate());
        int loneDay = period.getDays();


        /**
         * 추후 추가 필요
         * 보여주는 기준 정하고 추가
         */
        ChildDetailResponseDto childDetailResponseDto = ChildDetailResponseDto.builder()
                .username(user.getUsername())
                .totalBalance(user.getBalance())
                .deposit(deposit)
                .stock(stock)
                .stockRate(stockRate)
                .creditRating(childDetail.getCreditRating())
                .loanBalance(loan.getBalance())
                .loneDay(loneDay)
                .build();

        return childDetailResponseDto;
    }

    public void safeAdd(SafeRequestDto safeRequestDto, Long parentId) {
        User user = userRepository.findById(parentId).orElseThrow(() -> new IllegalArgumentException());

        // 이체 로직

    }

    public void safeSub(SafeRequestDto safeRequestDto, Long parentId) {
        User user = userRepository.findById(parentId).orElseThrow(() -> new IllegalArgumentException());

        // 이체 로직
    }
}
