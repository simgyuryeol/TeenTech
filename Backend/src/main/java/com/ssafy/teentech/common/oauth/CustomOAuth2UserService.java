package com.ssafy.teentech.common.oauth;

import com.ssafy.teentech.common.error.ErrorCode;
import com.ssafy.teentech.common.error.exception.AuthException;
import com.ssafy.teentech.common.util.Role;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest)
        throws OAuth2AuthenticationException {
        OAuth2UserService oAuth2UserService = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = oAuth2UserService.loadUser(oAuth2UserRequest);

        return processOAuth2User(oAuth2UserRequest, oAuth2User);
    }

    protected OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest,
        OAuth2User oAuth2User) {

        OAuth2UserInfo oAuth2UserInfo = new OAuth2UserInfo(oAuth2User.getAttributes());

        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            throw new AuthException(ErrorCode.OAUTH_EMAIL_REQUIRED);
        }

        User user = userRepository.findByEmail(oAuth2UserInfo.getEmail())
            .orElseGet(() -> registerUser(oAuth2UserInfo));

        return UserPrincipal.create(user, oAuth2UserInfo.getAttributes());
    }

    private User registerUser(OAuth2UserInfo oAuth2UserInfo) {
        User user = new User(
            oAuth2UserInfo.getOAuth2Id(),
            oAuth2UserInfo.getNickName(),
            oAuth2UserInfo.getEmail(),
            oAuth2UserInfo.getImageUrl(),
            Role.USER);

        return userRepository.save(user);
    }

}
