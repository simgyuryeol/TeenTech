package com.ssafy.teentech.common.fcm.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.teentech.common.error.ErrorCode;
import com.ssafy.teentech.common.error.exception.FCMException;
import com.ssafy.teentech.common.error.exception.InvalidRequestException;
import com.ssafy.teentech.common.fcm.dto.request.FCMNotificationRequestDto;
import com.ssafy.teentech.common.util.RedisService;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FCMNotificationService {

    private final FirebaseMessaging firebaseMessaging;
    private final RedisService redisService;

    public void sendNotificationByToken(FCMNotificationRequestDto requestDto) {
        String targetFCMToken = redisService.getValues("FCM_" + requestDto.getTargetUserId());
        if (!Objects.isNull(targetFCMToken)) {
            Notification notification = Notification.builder().setTitle(requestDto.getTitle())
                .setBody(requestDto.getBody()).build();

            Message message = Message.builder().setToken(targetFCMToken)
                .setNotification(notification).build();

            try {
                firebaseMessaging.send(message);
            } catch (FirebaseMessagingException e) {
                e.printStackTrace();
                throw new FCMException(ErrorCode.FAIL_SEND_FCM_MESSAGE);
            }
        } else {
            throw new InvalidRequestException(ErrorCode.FCM_TOKEN_NOT_FOUND);
        }
    }
}

