package com.ssafy.teentech.parent.service;

import com.ssafy.teentech.parent.dto.request.*;
import com.ssafy.teentech.parent.dto.response.ChildDetailResponseDto;
import com.ssafy.teentech.parent.dto.response.ChildGetResponseDto;
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
public class ParentService {

    private final ChildDetailRepository childDetailRepository;
    private final UserRepository userRepository;

    public void setUpPinMoney(SetUpPinMoneyRequestDto setUpPinMoney, Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        childDetail.setPocketMoney(setUpPinMoney.getPinMoney());
        childDetail.setPocketMoneyCycle(setUpPinMoney.getCycle());

        childDetailRepository.save(childDetail);
    }

    public void sendPinMoney(SendPinMoneyRequestDto sendPinMoney, Long childId, Long parentId) {
        //이체 로직
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
        User user = userRepository.findByInviteCode(childAddRequestDto.getInviteCode()).orElseThrow(() -> new IllegalArgumentException());

        user.setParentId(parentId);
        userRepository.save(user);
    }

    public void childDelete(ChildDeleteRequestDto childDeleteRequestDto) {
        User user = userRepository.findByInviteCode(childDeleteRequestDto.getInviteCode()).orElseThrow(() -> new IllegalArgumentException());
        user.setParentId(null);

        // 유저 잔액 부모한테 이체 로직
    }

    public ChildDetailResponseDto childDetail(Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        /**
         * 추후 추가 필요
         * 보여주는 기준 정하고 추가
         */
        ChildDetailResponseDto childDetailResponseDto = ChildDetailResponseDto.builder()
                .username(user.getUsername())
                .build();


        return childDetailResponseDto;
    }

    public void safeAdd(SafeRequestDto safeRequestDto, Long parentId) {
        User user = userRepository.findById(parentId).orElseThrow(() -> new IllegalArgumentException());

        //
    }
}
