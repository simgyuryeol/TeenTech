package com.ssafy.teentech.quiz.service;

import com.ssafy.teentech.quiz.dto.request.QuizAllowanceSettingsRequestDto;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizParentService {
    final private UserRepository userRepository;
    final private ChildDetailRepository childDetailRepository;

    public void quizAllowanceSettings(QuizAllowanceSettingsRequestDto quizAllowanceSettingsRequestDto, Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        childDetail.setQuizPoint(quizAllowanceSettingsRequestDto.getCost());

        childDetailRepository.save(childDetail);
    }
}
