package com.ssafy.teentech.lotto.service;

import com.ssafy.teentech.lotto.dto.request.LottoSetRequestDto;
import com.ssafy.teentech.lotto.repository.LottoRepository;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LottoParentService {
    private final LottoRepository lottoRepository;
    private final UserRepository userRepository;
    private final ChildDetailRepository childDetailRepository;

    /**
     * 자식 금융 정보에 로또 정보 수정
     */
    public void lottoSet(LottoSetRequestDto lottoSetRequestDto, Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        childDetail.setTotalLotteryPrize(lottoSetRequestDto.getCost());

        childDetailRepository.save(childDetail);
    }


}
