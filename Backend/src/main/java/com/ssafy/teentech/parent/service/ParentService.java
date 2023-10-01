package com.ssafy.teentech.parent.service;

import com.ssafy.teentech.bank.dto.request.AutoTransactionRequestDto;
import com.ssafy.teentech.bank.dto.response.AccountResponseDto;
import com.ssafy.teentech.bank.service.BankService;
import com.ssafy.teentech.parent.dto.request.*;
import com.ssafy.teentech.parent.dto.response.ChildGetResponseDto;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ParentService {

    private final ChildDetailRepository childDetailRepository;
    private final UserRepository userRepository;
    private final BankService bankService;

    public void setUpPinMoney(SetUpPinMoneyRequestDto setUpPinMoney, Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        childDetail.setPocketMoney(setUpPinMoney.getPinMoney());
        childDetail.setPocketMoneyCycle(setUpPinMoney.getCycle());

        childDetailRepository.save(childDetail);
    }

    public void sendPinMoney(SendPinMoneyRequestDto sendPinMoney, Long childId, Long parentId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        //이체 로직
        AccountResponseDto depositInformation = bankService.getAccountInformation(parentId);
        String depositAccountNumber = depositInformation.getAccountNumber();

        AccountResponseDto withdrawInformation = bankService.getAccountInformation(user.getParentId());
        String withdrawAccountNumber = withdrawInformation.getAccountNumber();


        AutoTransactionRequestDto autoTransactionRequestDto = new AutoTransactionRequestDto(
                parentId,
                withdrawAccountNumber,
                depositAccountNumber,
                (long)sendPinMoney.getPinMoney(),
                "용돈"
        );

        bankService.autoTransfer(autoTransactionRequestDto);
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
        User user = userRepository.findByAccountNumber(childAddRequestDto.getAccountNumber()).orElseThrow(() -> new IllegalArgumentException());

        user.setParentId(parentId);
        userRepository.save(user);
    }

    public void childDelete(ChildDeleteRequestDto childDeleteRequestDto) {
        User user = userRepository.findByAccountNumber(childDeleteRequestDto.getAccountNumber()).orElseThrow(() -> new IllegalArgumentException());
        user.setParentId(null);
    }

    public void safeAdd(SafeRequestDto safeRequestDto, Long parentId) {
        User user = userRepository.findById(parentId).orElseThrow(() -> new IllegalArgumentException());

        // 이체 로직
        AccountResponseDto depositInformation = bankService.getAccountInformation(parentId);
        String depositAccountNumber = depositInformation.getAccountNumber();

        AutoTransactionRequestDto autoTransactionRequestDto = new AutoTransactionRequestDto(
                parentId,
                null,
                depositAccountNumber,
                (long)safeRequestDto.getMoney(),
                "금고 저장"
        );

        bankService.autoTransfer(autoTransactionRequestDto);


    }

    public void safeSub(SafeRequestDto safeRequestDto, Long parentId) {
        User user = userRepository.findById(parentId).orElseThrow(() -> new IllegalArgumentException());

        // 이체 로직
        AccountResponseDto depositInformation = bankService.getAccountInformation(parentId);
        String depositAccountNumber = depositInformation.getAccountNumber();

        AutoTransactionRequestDto autoTransactionRequestDto = new AutoTransactionRequestDto(
                parentId,
                depositAccountNumber,
                null,
                (long)safeRequestDto.getMoney(),
                "금고 빼기"
        );

        bankService.autoTransfer(autoTransactionRequestDto);

    }

    public void interestRateSetting(InterestRateSettingRequestDto interestRateSettingRequestDto, Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        childDetail.setDepositInterestRate(interestRateSettingRequestDto.getDeposit());
        childDetail.setLoanInterestRate(interestRateSettingRequestDto.getLoan());

        childDetailRepository.save(childDetail);
    }
}
