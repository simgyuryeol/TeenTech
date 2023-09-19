package com.ssafy.teentech.invest.service;

import com.ssafy.teentech.invest.domain.Stock;
import com.ssafy.teentech.invest.domain.StocksHeld;
import com.ssafy.teentech.invest.dto.request.StockHeldSaveRequestDto;
import com.ssafy.teentech.invest.dto.request.StockSellRequestDto;
import com.ssafy.teentech.invest.dto.request.StockTradeSaveRequestDto;
import com.ssafy.teentech.invest.dto.response.CheckStockHoldingsResponseDto;
import com.ssafy.teentech.invest.repository.NewsRepository;
import com.ssafy.teentech.invest.repository.StockRepository;
import com.ssafy.teentech.invest.repository.StockTradeRepository;
import com.ssafy.teentech.invest.repository.StocksHeldRepository;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InvestService {
    private final StocksHeldRepository stocksHeldRepository;
    private final UserRepository userRepository;
    private final StockTradeRepository stockTradeRepository;
    private final StockRepository stockRepository;
    private final NewsRepository newsRepository;

    public List<CheckStockHoldingsResponseDto> checkStockHoldings(Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());

        List<StocksHeld> stocksHeldList = stocksHeldRepository.findAllByUser(user).orElseThrow(() -> new IllegalArgumentException());

        List<CheckStockHoldingsResponseDto> stockHoldingsResponseDtoList = new ArrayList<>();

        for (StocksHeld stocksHeld : stocksHeldList) {
            CheckStockHoldingsResponseDto checkStockHoldingsResponseDto = CheckStockHoldingsResponseDto.builder()
                    .company_name(stocksHeld.getStock().getCompanyName())
                    .amount(stocksHeld.getAmount())
                    .averagePrice(stocksHeld.getAveragePrice())
                    .build();

            stockHoldingsResponseDtoList.add(checkStockHoldingsResponseDto);
        }

        return stockHoldingsResponseDtoList;
    }


    /**
     * 1. 은행 서버로 거래 요청을 보내고 계좌 거래과 완료되면 응답을 받는다.
     * 응답 시간을 거래 시간으로 저장한다.
     * 2. 주식 거래 내역에 추가
     * 3. 보유 주식 갯수(count) 줄어듬
     *
     *  주식 갯수는 보유 갯수를 넘어 오지 않음을 보장함
     */
    public void stockSell(StockSellRequestDto stockSellRequestDto, Long childId) {
        // 1. 은행 서버로 거래 요청

        //2.주식 거래 내역에 추가
        Stock stock = stockRepository.findByCompanyName(stockSellRequestDto.getCompanyName()).orElseThrow(() -> new IllegalArgumentException());
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());

        StockTradeSaveRequestDto stockTradeSaveRequestDto = StockTradeSaveRequestDto.builder()
                .stock(stock)
                .user(user)
                .amount(stockSellRequestDto.getAmount())
                .price(stockSellRequestDto.getPrice())
                .tradeDate(LocalDate.now()) //은행 서버에서 온 값을 저장
                .build();

        stockTradeRepository.save(stockTradeSaveRequestDto.toEntity());

        // 3. 보유 주식 갯수 줄어듬
       StocksHeld byStock = stocksHeldRepository.findByStock(stock).orElseThrow(() -> new IllegalArgumentException());

        StockHeldSaveRequestDto stockHeldSaveRequestDto = StockHeldSaveRequestDto.builder()
                .stock(byStock.getStock())
                .amount(byStock.getAmount()- stockSellRequestDto.getAmount())
                .averagePrice(byStock.getAveragePrice())
                .user(byStock.getUser())
                .build();


        stocksHeldRepository.save(stockHeldSaveRequestDto.toEntity());


    }
}
