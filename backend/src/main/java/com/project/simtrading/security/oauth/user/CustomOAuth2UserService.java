package com.project.simtrading.security.oauth.user;


import com.project.simtrading.entity.common.AuthProvider;
import com.project.simtrading.entity.common.Role;
import com.project.simtrading.entity.User;
import com.project.simtrading.exception.OAuthProcessingException;
import com.project.simtrading.repo.UserRepository;
import com.project.simtrading.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    // OAuth2UserRequest에 있는 Access Token으로 유저정보 get
    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        System.out.println("********************************************");
        System.out.println("CustomOauth2UserService LoadUser ***********");
        System.out.println("********************************************");
        System.out.println("registration: " + oAuth2UserRequest.getClientRegistration());
        System.out.println("token : " + oAuth2UserRequest.getAccessToken().getTokenValue());


        try {
            return process(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    // 획득한 유저정보를 Java Model과 맵핑하고 프로세스 진행
    private OAuth2User process(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId());
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(authProvider, oAuth2User.getAttributes());

        if (userInfo.getEmail().isEmpty()) {
            throw new OAuthProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByProviderId(userInfo.getId());
        User user;

        if (userOptional.isPresent()) {		// 이미 가입된 경우
            user = userOptional.get();
            System.out.println("user is present and user email is : " + user.getEmail());

            if (!authProvider.equals(user.getProvider())) {
                throw new OAuthProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateUser(user, userInfo);
        } else {			// 가입되지 않은 경우
            user = createUser(userInfo, authProvider);
        }

        System.out.println("CustomOauth2UserService processing complete");
        return CustomUserDetails.create(user, oAuth2User.getAttributes());
    }

    private User createUser(OAuth2UserInfo userInfo, AuthProvider authProvider) {
        User user = new User();
        user.setName(userInfo.getName());
        user.setImageUrl(user.getImageUrl());
        user.setEmail(userInfo.getEmail());
        user.setProvider(authProvider);
        user.setProviderId(userInfo.getId());
        user.setRole(Role.USER);

        return userRepository.save(user);
    }

    private User updateUser(User user, OAuth2UserInfo oAuth2UserInfo) {
        user.setName(oAuth2UserInfo.getName());
        user.setImageUrl(oAuth2UserInfo.getImageUrl());
        return userRepository.save(user);
    }
}
