package com.ssafy.teentech.accountbook.service;

import com.ssafy.teentech.accountbook.domain.AccountBook;
import com.ssafy.teentech.accountbook.dto.request.AccountBookAmountRequestDto;
import com.ssafy.teentech.accountbook.dto.responsee.AccountBookAmountResponseDto;
import com.ssafy.teentech.accountbook.repository.AccountBookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountBookService {

    final private AccountBookRepository accountBookRepository;

    public AccountBookAmountResponseDto accountBookAmount(AccountBookAmountRequestDto accountBookAmountRequestDto) {
        List<AccountBook> accountBookList = accountBookRepository.findByDate(accountBookAmountRequestDto.getDate());

        Map<String,Integer> account = new HashMap<>();
        //수입
        account.put("용돈",0);
        account.put("아르바이트",0);
        account.put("퀴즈",0);
        account.put("투자",0);
        //소비
        account.put("투자소비",0);
        account.put("욕구소비",0);
        account.put("필요소비",0);

        for (AccountBook accountBook : accountBookList) {
            account.put(accountBook.getAssetType(),account.get(accountBook.getAssetType())+accountBook.getWithdrawalAmount());
            account.put(accountBook.getAssetType(),account.get(accountBook.getAssetType())+accountBook.getDepositAmount());
        }

        AccountBookAmountResponseDto accountBookAmountResponseDto = AccountBookAmountResponseDto.builder()
                .pinMoney(account.get("용돈"))
                .quiz(account.get("퀴즈"))
                .job(account.get("아르바이트"))
                .invest(account.get("투자"))
                .investConsumption(account.get("투자소비"))
                .desireConsumption(account.get("욕구소비"))
                .necessaryConsumption(account.get("필요소비"))
                .build();

        return accountBookAmountResponseDto;

    }
}
