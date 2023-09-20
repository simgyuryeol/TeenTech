package com.ssafy.teentech.invest.service;

import com.ssafy.teentech.invest.domain.Stock;
import com.ssafy.teentech.invest.domain.StocksHeld;
import com.ssafy.teentech.invest.dto.request.StockHeldSaveRequestDto;
import com.ssafy.teentech.invest.dto.request.StockTransactionRequestDto;
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
    public void stockSell(StockTransactionRequestDto stockSellRequestDto, Long childId) {
        Stock stock = stockRepository.findByCompanyName(stockSellRequestDto.getCompanyName()).orElseThrow(() -> new IllegalArgumentException());
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        StocksHeld byStock = stocksHeldRepository.findByStock(stock).orElseThrow(() -> new IllegalArgumentException());

        // 1. 은행 서버로 거래 요청

        //2.주식 거래 내역에 추가
        addStockTransactionHistory(stock,user,stockSellRequestDto,0);

        // 3. 보유 주식 갯수 줄어듬
        stocksHeldUpdate(-stockSellRequestDto.getAmount(), stock,byStock,byStock.getAveragePrice());


    }

    /**
     * 1. 은행 서버로 거래 요청을 보낸다.
     * 2. 주식 거래 내역에 추가
     * 3. 보유 주식 갯수(count) 늘어남, 평단가 조정
     */
    public void stockBuy(StockTransactionRequestDto stockSellRequestDto,Long childId) {
        Stock stock = stockRepository.findByCompanyName(stockSellRequestDto.getCompanyName()).orElseThrow(() -> new IllegalArgumentException());
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        StocksHeld byStock = stocksHeldRepository.findByStock(stock).orElseThrow(() -> new IllegalArgumentException());

        // 1. 은행으로 거래 요청

        // 2. 주식 거래 내역 추가
        addStockTransactionHistory(stock,user,stockSellRequestDto,1);

        // 3. 보유 주식 갯수 늘어남
        // 평단가 계산 -> (보유 갯수 * 평단가 + 구매 갯수 * 구매 가격) //  (보유 갯수 + 구매 갯수)
        Integer averagePrice = (byStock.getAmount() * byStock.getAveragePrice() + stockSellRequestDto.getPrice() * stockSellRequestDto.getAmount()) / (byStock.getAmount()+ stockSellRequestDto.getAmount());
        stocksHeldUpdate(stockSellRequestDto.getAmount(), stock,byStock,averagePrice);

    }

    private void stocksHeldUpdate(Integer amount, Stock stock,StocksHeld byStock,Integer averagePrice ) {


        StockHeldSaveRequestDto stockHeldSaveRequestDto = StockHeldSaveRequestDto.builder()
                .stock(byStock.getStock())
                .amount(byStock.getAmount()+ amount)
                .averagePrice(averagePrice)
                .user(byStock.getUser())
                .build();

        stocksHeldRepository.save(stockHeldSaveRequestDto.toEntity());
    }

    private void addStockTransactionHistory(Stock stock, User user,StockTransactionRequestDto stockSellRequestDto,Integer type) {


        StockTradeSaveRequestDto stockTradeSaveRequestDto = StockTradeSaveRequestDto.builder()
                .stock(stock)
                .user(user)
                .amount(stockSellRequestDto.getAmount())
                .price(stockSellRequestDto.getPrice())
                .tradeDate(LocalDate.now()) //은행 서버에서 온 값을 저장
                .type(type)
                .build();

        stockTradeRepository.save(stockTradeSaveRequestDto.toEntity());

    }
}
