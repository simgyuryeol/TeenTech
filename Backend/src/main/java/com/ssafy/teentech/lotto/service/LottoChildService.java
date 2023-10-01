package com.ssafy.teentech.lotto.service;

import com.ssafy.teentech.bank.dto.request.AutoTransactionRequestDto;
import com.ssafy.teentech.bank.dto.response.AccountResponseDto;
import com.ssafy.teentech.bank.service.BankService;
import com.ssafy.teentech.lotto.domain.Lotto;
import com.ssafy.teentech.lotto.dto.LottoSaveDto;
import com.ssafy.teentech.lotto.dto.request.LottoWinningsRequestDto;
import com.ssafy.teentech.lotto.dto.response.LottoHistoryResponseDto;
import com.ssafy.teentech.lotto.dto.response.LottoTicketResponseDto;
import com.ssafy.teentech.lotto.repository.LottoRepository;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LottoChildService {

    final private UserRepository userRepository;
    final private ChildDetailRepository childDetailRepository;
    final private LottoRepository lottoRepository;
    final private BankService bankService;

    /**
     * 1. 로또 음모권 -1
     * 2. 당청됐으면 이체 api 실행
     */
    public void lottoWinnings(LottoWinningsRequestDto lottoWinningsRequestDto, Long childId) {
        // 1. 로또 응모권 -1
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        childDetail.setLotteryCoupon(childDetail.getLotteryCoupon()-1);

        childDetailRepository.save(childDetail);

        if(lottoWinningsRequestDto.getSuccess()==0){ // 성공햇으면 이체 api 실행
            AccountResponseDto depositInformation = bankService.getAccountInformation(childId);
            String depositAccountNumber = depositInformation.getAccountNumber();

            AccountResponseDto withdrawInformation = bankService.getAccountInformation(user.getParentId());
            String withdrawAccountNumber = withdrawInformation.getAccountNumber();


            AutoTransactionRequestDto autoTransactionRequestDto = new AutoTransactionRequestDto(
                    childId,
                    withdrawAccountNumber,
                    depositAccountNumber,
                    (long)childDetail.getTotalLotteryPrize(),
                    "로또 당첨 이체"
            );

            bankService.autoTransfer(autoTransactionRequestDto);

            // 이체 내역 성공 후 복권 내역을 저장한다.
            LottoSaveDto lottoSaveDto = LottoSaveDto.builder()
                    .user(user)
                    .date(lottoWinningsRequestDto.getDate())
                    .winnings(lottoWinningsRequestDto.getCost())
                    .build();

            lottoRepository.save(lottoSaveDto.toEntity());
        }

    }


    public List<LottoHistoryResponseDto> lottoHistory(Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());

        List<Lotto> lottos = lottoRepository.findAllByUser(user).orElseThrow(() -> new IllegalArgumentException());
        List<LottoHistoryResponseDto> lottoHistoryResponseDtoList = new ArrayList<>();
        for (Lotto lotto : lottos) {
            LottoHistoryResponseDto lottoHistoryResponseDto = LottoHistoryResponseDto.builder()
                    .cost(lotto.getWinnings())
                    .date(lotto.getDate())
                    .build();

            lottoHistoryResponseDtoList.add(lottoHistoryResponseDto);
        }

        return lottoHistoryResponseDtoList;

    }

    public LottoTicketResponseDto lottoTicket(Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        LottoTicketResponseDto lottoTicketResponseDto = LottoTicketResponseDto.builder()
                .lotteryCoupon(childDetail.getLotteryCoupon())
                .totalLotteryPrize(childDetail.getTotalLotteryPrize())
                .build();

        return lottoTicketResponseDto;
    }
}
