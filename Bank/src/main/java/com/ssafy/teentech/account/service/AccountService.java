package com.ssafy.teentech.account.service;

import com.ssafy.teentech.account.domain.Account;
import com.ssafy.teentech.account.dto.AccountResponseDto;
import com.ssafy.teentech.account.repository.AccountRepository;
import com.ssafy.teentech.common.error.ErrorCode;
import com.ssafy.teentech.common.error.exception.AccountException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountResponseDto getAccountInformation(Long userId) {
        Account account = accountRepository.findById(userId)
            .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
        AccountResponseDto accountResponseDto = new AccountResponseDto(account.getUserName(),
            account.getAccountNumber(), account.getBalance());
        return accountResponseDto;
    }
}
