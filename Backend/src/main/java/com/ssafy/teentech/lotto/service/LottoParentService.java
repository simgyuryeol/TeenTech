package com.ssafy.teentech.lotto.service;

import com.ssafy.teentech.lotto.dto.request.LottoSetRequestDto;
import com.ssafy.teentech.lotto.repository.LottoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LottoParentService {
    private final LottoRepository lottoRepository;

    /**
     * 자식 금융 정보에 로또 정보 수정
     */
    public void lottoSet(LottoSetRequestDto lottoSetRequestDto, Long childId) {
        
    }
}
