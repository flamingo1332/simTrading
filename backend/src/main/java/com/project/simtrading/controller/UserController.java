package com.project.simtrading.controller;

import com.project.simtrading.entity.User;
import com.project.simtrading.exception.ResourceNotFoundException;
import com.project.simtrading.repo.UserRepository;
import com.project.simtrading.security.CustomUserDetails;
import io.swagger.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;


//    @AuthenticationPrincipal == authentication.getPrincipal(); //securitycontextholder에서 가져오는 건가
//    @PreAuthorize("hasRole('USER')") // 된다.
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        System.out.println("getCurrentUser");
        System.out.println(customUserDetails.getName());
        System.out.println(customUserDetails.getEmail());

        User user = userRepository.findById(customUserDetails.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", customUserDetails.getId()));
        return ResponseEntity.ok(user);
    }



}
