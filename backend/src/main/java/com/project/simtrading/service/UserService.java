package com.project.simtrading.service;

import com.project.simtrading.entity.User;
import com.project.simtrading.payload.SignUpRequest;

public interface UserService {

    User getUserById(long id);

    User createUser(SignUpRequest signUpRequest);
}
