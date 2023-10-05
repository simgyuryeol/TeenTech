package com.ssafy.teentech.transaction.service;

import com.ssafy.teentech.account.domain.Account;
import com.ssafy.teentech.account.repository.AccountRepository;
import com.ssafy.teentech.common.error.ErrorCode;
import com.ssafy.teentech.common.error.exception.AccountException;
import com.ssafy.teentech.common.error.exception.TransactionException;
import com.ssafy.teentech.transaction.domain.Transaction;
import com.ssafy.teentech.transaction.dto.TransactionType;
import com.ssafy.teentech.transaction.dto.request.AutoTransactionRequestDto;
import com.ssafy.teentech.transaction.dto.request.TransactionListRequestDto;
import com.ssafy.teentech.transaction.dto.request.TransactionRequestDto;
import com.ssafy.teentech.transaction.dto.response.TransactionListResponseDto;
import com.ssafy.teentech.transaction.dto.response.TransactionResponseDto;
import com.ssafy.teentech.transaction.repository.TransactionRepository;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    public void executeTransaction(TransactionRequestDto transactionRequestDto) {
        if (transactionRequestDto.getAmount() < 1) {
            throw new TransactionException(ErrorCode.INVALID_TRANSFER_AMOUNT);
        }

        String withdrawAccountNumber = transactionRequestDto.getWithdrawAccountNumber();
        String depositAccountNumber = transactionRequestDto.getDepositAccountNumber();

        Account withdrawAccount = accountRepository.findByAccountNumberForUpdate(
                withdrawAccountNumber)
            .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        withdrawAccount.checkOwner(transactionRequestDto.getWithdrawAccountId());
        withdrawAccount.checkPassword(transactionRequestDto.getWithdrawAccountPassword());

        Account depositAccount = accountRepository.findByAccountNumberForUpdate(
                depositAccountNumber)
            .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        withdrawAccount.withdraw(transactionRequestDto.getAmount());
        depositAccount.deposit(transactionRequestDto.getAmount());

        Transaction transaction = Transaction.builder().withdrawAccount(withdrawAccount)
            .balanceAfterWithdraw(withdrawAccount.getBalance()).depositAccount(depositAccount)
            .balanceAfterDeposit(depositAccount.getBalance())
            .transferAmount(transactionRequestDto.getAmount())
            .content(transactionRequestDto.getContent()).build();
        transactionRepository.save(transaction);
    }

    public void executeAutoTransaction(AutoTransactionRequestDto autoTransactionRequestDto) {
        if (autoTransactionRequestDto.getAmount() < 1) {
            throw new TransactionException(ErrorCode.INVALID_TRANSFER_AMOUNT);
        }

        String withdrawAccountNumber = autoTransactionRequestDto.getWithdrawAccountNumber();
        String depositAccountNumber = autoTransactionRequestDto.getDepositAccountNumber();

        Account withdrawAccount = accountRepository.findByAccountNumberForUpdate(
                withdrawAccountNumber)
            .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        withdrawAccount.checkOwner(autoTransactionRequestDto.getWithdrawAccountId());

        Account depositAccount = accountRepository.findByAccountNumberForUpdate(
                depositAccountNumber)
            .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        withdrawAccount.withdraw(autoTransactionRequestDto.getAmount());
        depositAccount.deposit(autoTransactionRequestDto.getAmount());

        Transaction transaction = Transaction.builder().withdrawAccount(withdrawAccount)
            .balanceAfterWithdraw(withdrawAccount.getBalance()).depositAccount(depositAccount)
            .balanceAfterDeposit(depositAccount.getBalance())
            .transferAmount(autoTransactionRequestDto.getAmount())
            .content(autoTransactionRequestDto.getContent()).build();
        transactionRepository.save(transaction);
    }

    public TransactionListResponseDto getTransactions(
        TransactionListRequestDto transactionListRequestDto) {
        Account account = accountRepository.findByAccountNumberForUpdate(
                transactionListRequestDto.getAccountNumber())
            .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
        account.checkOwner(transactionListRequestDto.getUserId());

        TransactionListResponseDto transactionListResponseDto = new TransactionListResponseDto(
            transactionRepository.findAllByWithdrawAccountOrDepositAccountAndTransactionIdGreaterThan(account, transactionListRequestDto.getIndex()).stream()
                .map(t -> {
                    if (account.equals(t.getDepositAccount())) {
                        return new TransactionResponseDto(t.getTransactionId(),
                            TransactionType.DEPOSIT, t.getWithdrawAccount().getUserName(),
                            t.getBalanceAfterDeposit(), t.getTransferAmount(), t.getContent(),
                            t.getCreatedDateTime());
                    } else {
                        return new TransactionResponseDto(t.getTransactionId(),
                            TransactionType.WITHDRAW, t.getDepositAccount().getUserName(),
                            t.getBalanceAfterWithdraw(), t.getTransferAmount(), t.getContent(),
                            t.getCreatedDateTime());
                    }
                }).collect(Collectors.toList()));

        return transactionListResponseDto;
    }
}
