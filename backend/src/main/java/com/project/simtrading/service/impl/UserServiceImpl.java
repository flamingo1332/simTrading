package com.project.simtrading.service.impl;

import com.project.simtrading.entity.User;
import com.project.simtrading.entity.common.AuthProvider;
import com.project.simtrading.entity.common.Role;
import com.project.simtrading.exception.BadRequestException;
import com.project.simtrading.exception.ResourceNotFoundException;
import com.project.simtrading.payload.SignUpRequest;
import com.project.simtrading.repo.UserRepository;
import com.project.simtrading.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User getUserById(long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("user", "id", id));
    }

    @Override
    public User createUser(SignUpRequest signUpRequest) {
        if(repository.existsByEmail(signUpRequest.getEmail()))
            throw new BadRequestException("Email address already in use.");

    // Creating user's account
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(AuthProvider.local);
        user.setRole(Role.USER);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }
}
