package com.ssafy.teentech.accountbook.service;

import com.ssafy.teentech.accountbook.domain.AccountBook;
import com.ssafy.teentech.accountbook.dto.AccountBookSaveDto;
import com.ssafy.teentech.accountbook.dto.request.AccountBookAddRequestDto;
import com.ssafy.teentech.accountbook.dto.responsee.AccountBookAmountResponseDto;
import com.ssafy.teentech.accountbook.dto.responsee.AccountBookDateResponseDto;
import com.ssafy.teentech.accountbook.dto.responsee.AccountBookDetailResponseDto;
import com.ssafy.teentech.accountbook.repository.AccountBookRepository;
import com.ssafy.teentech.bank.dto.request.TransactionListRequestDto;
import com.ssafy.teentech.bank.dto.response.TransactionListResponseDto;
import com.ssafy.teentech.bank.dto.response.TransactionResponseDto;
import com.ssafy.teentech.bank.service.BankService;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountBookService {

    final private AccountBookRepository accountBookRepository;
    final private UserRepository userRepository;
    final private ChildDetailRepository childDetailRepository;
    final private BankService bankService;

    public AccountBookAmountResponseDto accountBookAmount(LocalDate date,Long child_id) {
        User user = userRepository.findById(child_id).orElseThrow(() -> new IllegalArgumentException());
        List<AccountBook> accountBookList = accountBookRepository.findByDateAndUser(date,user);

        Map<String,Integer> account = new HashMap<>();
        //수입
        account.put("아르바이트",0);
        account.put("용돈",0);
        account.put("퀴즈",0);
        account.put("투자",0);
        //소비
        account.put("투자소비",0);
        account.put("욕구소비",0);
        account.put("필요소비",0);

        for (AccountBook accountBook : accountBookList) {
            if(account.get(accountBook.getContent())==null){
                continue;
            }
            account.put(accountBook.getContent(),account.get(accountBook.getContent())+accountBook.getWithdrawalAmount());
            account.put(accountBook.getContent(),account.get(accountBook.getContent())+accountBook.getDepositAmount());
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

    public List<AccountBookDateResponseDto> accountBookDate(LocalDate date, Long child_id) {
        User user = userRepository.findById(child_id).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());
        List<AccountBook> accountBookList = accountBookRepository.findByDateAndUser(date,user);


        //뱅크 서버에서 거래 내역을 받아옴
        List<AccountBook> accountBooks = new ArrayList<>();

        TransactionListRequestDto transactionListRequestDto = new TransactionListRequestDto(user.getUserId(),user.getAccountNumber(),childDetail.getIndex());
        TransactionListResponseDto transactions = bankService.getTransactions(transactionListRequestDto);

        for (TransactionResponseDto transactionResponseDto : transactions.getTransactions()) {
            Integer depositAmount = 0;
            Integer withdrawalAmount = 0;
            if (transactionResponseDto.getType().equals("DEPOSIT")){ //수입인 경우
                depositAmount = transactionResponseDto.getTransferAmount().intValue();
            }
            else{
                withdrawalAmount = transactionResponseDto.getTransferAmount().intValue();
            }

            AccountBookSaveDto accountBookSaveDto = AccountBookSaveDto.builder()
                    .assetType(transactionResponseDto.getType())
                    .content(transactionResponseDto.getContent())
                    .withdrawalAmount(withdrawalAmount)
                    .depositAmount(depositAmount)
                    .transactionDate(transactionResponseDto.getCreatedDateTime().toLocalDate())
                    .transactionTime(transactionResponseDto.getCreatedDateTime().toLocalTime())
                    .user(user)
                    .build();

            accountBooks.add(accountBookSaveDto.toEntity());

            childDetail.setIndex(transactionResponseDto.getTransactionId().intValue()); //인덱스값 더하기
        }



        accountBookRepository.saveAll(accountBooks);


        Map<LocalDate,Integer[]> account = new HashMap<>();

        for (AccountBook accountBook : accountBookList) {
            Integer dateAccount[] = new Integer[2]; //수입, 소비 순
            dateAccount[0] = 0;
            dateAccount[1] = 0;
            if(account.containsKey(accountBook.getTransactionDate())){ //값이 있으면 더해준다.
                dateAccount = account.get(accountBook.getTransactionDate());
            }
            dateAccount[0] += accountBook.getDepositAmount();
            dateAccount[1] += accountBook.getWithdrawalAmount();

            account.put(accountBook.getTransactionDate(),dateAccount);
        }
        List<AccountBookDateResponseDto> accountBookDateResponseDtoList = new ArrayList<>();
        for (LocalDate localDate : account.keySet()) {
            AccountBookDateResponseDto accountBookDateResponseDto = AccountBookDateResponseDto.builder()
                    .date(localDate)
                    .importAmount((account.get(localDate))[0])
                    .spendingAmount(account.get(localDate)[1])
                    .build();

            accountBookDateResponseDtoList.add(accountBookDateResponseDto);
        }

        return accountBookDateResponseDtoList;

    }

    public void accountBookAdd(AccountBookAddRequestDto accountBookAddRequestDto) {
        AccountBook accountBook = accountBookRepository.findById(accountBookAddRequestDto.getAccountBookId())
                .orElseThrow(() ->new IllegalArgumentException());

        accountBook.setConsumptionType(accountBookAddRequestDto.getConsumptionType());
        accountBookRepository.save(accountBook);

    }

    public List<AccountBookDetailResponseDto> accountBookDetail(LocalDate date,Long child_id) {
        User user = userRepository.findById(child_id).orElseThrow(() -> new IllegalArgumentException());
        List<AccountBook> byDay = accountBookRepository.findByDayAndUser(date,user);
        List<AccountBookDetailResponseDto> accountBookDetailResponseDtoList = new ArrayList<>();
        for (AccountBook accountBook : byDay) {
            AccountBookDetailResponseDto accountBookDetailResponseDto = AccountBookDetailResponseDto.builder()
                    .accountBookId(accountBook.getAccountBookId())
                    .assetType(accountBook.getAssetType())
                    .consumptionType(accountBook.getConsumptionType())
                    .content(accountBook.getContent())
                    .depositAmount(accountBook.getDepositAmount())
                    .transactionTime(accountBook.getTransactionTime())
                    .withdrawalAmount(accountBook.getWithdrawalAmount())
                    .build();

            accountBookDetailResponseDtoList.add(accountBookDetailResponseDto);
        }

        return accountBookDetailResponseDtoList;
    }
}
