package com.ssafy.teentech.common.oauth;

import java.util.Map;

public class OAuth2UserInfo {

    protected Map<String, Object> attributes;
    private Long oauthId;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = (Map<String, Object>) attributes.get("kakao_account");
        this.oauthId = (Long) attributes.get("id");
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public String getOAuth2Id() {
        return oauthId.toString();
    }

    public String getNickName() {
        return (String) ((Map<String, Object>) attributes.get("profile")).get("nickname");
    }

    public String getEmail() {
        return (String) attributes.get("email");
    }

    public String getImageUrl() {
        return (String) ((Map<String, Object>) attributes.get("profile")).get("profile_image");
    }
}
