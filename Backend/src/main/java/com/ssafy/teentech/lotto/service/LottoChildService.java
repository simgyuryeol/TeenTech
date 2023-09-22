package com.ssafy.teentech.lotto.service;

import com.ssafy.teentech.lotto.domain.Lotto;
import com.ssafy.teentech.lotto.dto.request.LottoWinningsRequestDto;
import com.ssafy.teentech.lotto.dto.response.LottoHistoryResponseDto;
import com.ssafy.teentech.lotto.repository.LottoRepository;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LottoChildService {

    final private UserRepository userRepository;
    final private ChildDetailRepository childDetailRepository;
    final private LottoRepository lottoRepository;

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
}
