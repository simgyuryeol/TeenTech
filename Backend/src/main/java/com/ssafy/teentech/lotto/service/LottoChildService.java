package com.ssafy.teentech.lotto.service;

import com.ssafy.teentech.lotto.dto.request.LottoWinningsRequestDto;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LottoChildService {

    final private UserRepository userRepository;
    final private ChildDetailRepository childDetailRepository;

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


}
