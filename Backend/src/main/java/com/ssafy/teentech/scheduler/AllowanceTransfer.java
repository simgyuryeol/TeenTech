package com.ssafy.teentech.scheduler;

import com.ssafy.teentech.bank.dto.request.AutoTransactionRequestDto;
import com.ssafy.teentech.bank.dto.response.AccountResponseDto;
import com.ssafy.teentech.bank.service.BankService;
import com.ssafy.teentech.common.util.Cycle;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AllowanceTransfer {
    private final ChildDetailRepository childDetailRepository;
    private final BankService bankService;

    @Scheduled(cron = "0 0 9 * * MON") // 매주 월요일 9시에 실행
    public void weeklyAllowanceTransfer(){
        /**
         * 모든 유저 정보를 찾아서 용돈 주기가 주인 유저에게 용돈을 이체 해준다.
         * 1. 부모 잔고가 없을 경우 보내지 않고 알림을 보낸다.
         * 2. 있으며 그냥 보냄
         */
        List<ChildDetail> childDetailList = childDetailRepository.findAll();

        for (ChildDetail childDetail : childDetailList) {
            if(childDetail.getPocketMoneyCycle() == Cycle.WEEKLY){
                transfer(childDetail);
            }
        }
    }

    @Scheduled(cron = "0 0 9 1 * ?") // 매월 1일 9시에 실행
    public void monthlyAllowanceTransfer(){
        /**
         * 모든 유저 정보를 찾아서 용돈 주기가 월인 유저에게 용돈을 이체 해준다.
         * 1. 부모 잔고가 없을 경우 보내지 않고 알림을 보낸다.
         * 2. 있으며 그냥 보냄
         */
        List<ChildDetail> childDetailList = childDetailRepository.findAll();

        for (ChildDetail childDetail : childDetailList) {
            if(childDetail.getPocketMoneyCycle() == Cycle.MONTHLY){
                transfer(childDetail);
            }
        }
    }


    private void transfer(ChildDetail childDetail) {
        // 이체 로직
        AccountResponseDto depositInformation = bankService.getAccountInformation(childDetail.getUser().getUserId()); //입금 하는 쪽 보내는 쪽
        String depositAccountNumber = depositInformation.getAccountNumber();

        AccountResponseDto withdrawInformation = bankService.getAccountInformation(childDetail.getUser().getParentId());
        String withdrawAccountNumber = withdrawInformation.getAccountNumber();


        AutoTransactionRequestDto autoTransactionRequestDto = new AutoTransactionRequestDto(
                childDetail.getUser().getUserId(),
                withdrawAccountNumber,
                depositAccountNumber,
                (long) childDetail.getPocketMoney(),
                "매주 용돈 지급"
        );

        bankService.autoTransfer(autoTransactionRequestDto);
    }

}
