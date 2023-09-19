package com.ssafy.teentech.invest.service;

import com.ssafy.teentech.invest.domain.StocksHeld;
import com.ssafy.teentech.invest.dto.response.CheckStockHoldingsResponseDto;
import com.ssafy.teentech.invest.repository.StocksHeldRepository;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvestService {
    private final StocksHeldRepository stocksHeldRepository;
    private final UserRepository userRepository;
    public List<CheckStockHoldingsResponseDto> checkStockHoldings(Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());

        List<StocksHeld> stocksHeldList = stocksHeldRepository.findAllByUser(user).orElseThrow(() -> new IllegalArgumentException());

        List<CheckStockHoldingsResponseDto> stockHoldingsResponseDtoList = new ArrayList<>();

        for (StocksHeld stocksHeld : stocksHeldList) {
            CheckStockHoldingsResponseDto checkStockHoldingsResponseDto = CheckStockHoldingsResponseDto.builder()
                    .company_name(stocksHeld.getStock().getCompanyName())
                    .count(stocksHeld.getCount())
                    .investmentAmount(stocksHeld.getInvestmentAmount())
                    .build();

            stockHoldingsResponseDtoList.add(checkStockHoldingsResponseDto);
        }

        return stockHoldingsResponseDtoList;
    }


}
