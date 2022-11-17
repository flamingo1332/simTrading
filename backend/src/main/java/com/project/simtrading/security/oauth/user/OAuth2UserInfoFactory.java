package com.project.simtrading.security.oauth.user;


import com.project.simtrading.entity.common.AuthProvider;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(AuthProvider authProvider, Map<String, Object> attributes) {
        switch (authProvider) {
            case google: {
                System.out.println("authProvider: google");
                return new GoogleOAuth2UserInfo(attributes);
            }
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}