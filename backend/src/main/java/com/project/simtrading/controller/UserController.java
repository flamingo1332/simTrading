package com.project.simtrading.controller;

import com.project.simtrading.entity.User;
import com.project.simtrading.exception.ResourceNotFoundException;
import com.project.simtrading.repo.UserRepository;
import com.project.simtrading.security.CustomUserDetails;
import com.project.simtrading.service.UserService;
import io.swagger.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(userService.getUserById(customUserDetails.getId()));
    }

    @PreAuthorize("hasRole('ROLE_USER') AND #customUserDetails.getId() == #id")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCurrentUser(@PathVariable long id,
                                                    @AuthenticationPrincipal CustomUserDetails customUserDetails){
        userService.deleteUserById(customUserDetails.getId());
        return ResponseEntity.ok("user deleted");
    }
}
