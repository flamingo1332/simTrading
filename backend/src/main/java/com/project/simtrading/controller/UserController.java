package com.project.simtrading.controller;

import com.project.simtrading.entity.User;
import com.project.simtrading.exception.ResourceNotFoundException;
import com.project.simtrading.repo.UserRepository;
import com.project.simtrading.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @PreAuthorize("hasRole('USER')") // 된다.
    @GetMapping("/user/me")
    public User getCurrentUser(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        System.out.println("getCurrentUser");
        System.out.println(customUserDetails.getName());
        System.out.println(customUserDetails.getEmail());
        System.out.println(customUserDetails.getAttributes());

        return userRepository.findById(customUserDetails.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", customUserDetails.getId()));
    }

    @GetMapping("/user/me2")
    public String getCurrentUser2() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }



}
