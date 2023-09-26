package com.ssafy.teentech.user.service;

import com.ssafy.teentech.bank.dto.request.RegisterAccountRequestDto;
import com.ssafy.teentech.bank.service.BankService;
import com.ssafy.teentech.common.error.ErrorCode;
import com.ssafy.teentech.common.error.exception.AuthException;
import com.ssafy.teentech.common.error.exception.InvalidRequestException;
import com.ssafy.teentech.common.util.Role;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.dto.request.ExtraInformationRequestDto;
import com.ssafy.teentech.user.repository.UserRepository;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BankService bankService;

    @Value("${kakao.admin}")
    private String kakaoAdminKey;

    public User getUser(String userId) {
        return userRepository.findByEmail(userId)
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.USER_NOT_FOUND));
    }

    public User getUser(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new InvalidRequestException(ErrorCode.USER_NOT_FOUND));
    }

    public void addExtraInformation(String userEmail,
        ExtraInformationRequestDto extraInformationRequestDto) {
        User user = getUser(userEmail);

        if (!user.getRole().equals(Role.ROLE_USER)) {
            throw new InvalidRequestException(ErrorCode.RESOURCE_PERMISSION_DENIED);
        }

        /**
         * 뱅킹 서버에 계좌 업데이트(이름, 비밀번호)
         */
        RegisterAccountRequestDto registerAccountRequestDto = new RegisterAccountRequestDto(
            user.getUserId(), extraInformationRequestDto.getName(),
            extraInformationRequestDto.getPassword());

        bankService.registerAccount(registerAccountRequestDto);

        user.updateRole(extraInformationRequestDto.getRole());
    }

    /**
     * 회원 탈퇴
     */
    @Transactional
    public void deleteUser(String userId) {
        User user = userRepository.findByOauthId(userId);
        unlinkKakaoUser(user);
        userRepository.delete(user);
    }

    private void unlinkKakaoUser(User user) {
        ClientHttpRequestFactory httpRequestFactory = new HttpComponentsClientHttpRequestFactory();
        RestTemplate restTemplate = new RestTemplate(httpRequestFactory);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        httpHeaders.set("Authorization", "KakaoAK " + kakaoAdminKey);

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("target_id_type", "user_id");
        parameters.add("target_id", user.getOauthId());

        HttpEntity formEntity = new HttpEntity<>(parameters, httpHeaders);

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(
            "https://kapi.kakao.com/v1/user/unlink", formEntity, String.class);

        if (responseEntity.getStatusCode().value() != 200) {
            throw new AuthException(ErrorCode.FAIL_UNLINKING_KAKAO_ACCOUNT);
        }
    }
}
