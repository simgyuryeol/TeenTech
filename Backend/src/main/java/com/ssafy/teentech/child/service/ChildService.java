package com.ssafy.teentech.child.service;

import com.ssafy.teentech.child.dto.AvatarUpdate;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ChildService {
    private final ChildDetailRepository childDetailRepository;
    private final UserRepository userRepository;

    public void avatarUpdate(AvatarUpdate avatarUpdate, Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        childDetail.setAvatarImageUrl(avatarUpdate.getAvatarImageUrl());
        childDetailRepository.save(childDetail);
    }
}
