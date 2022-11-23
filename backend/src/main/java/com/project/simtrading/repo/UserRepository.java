package com.project.simtrading.repo;

import com.project.simtrading.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(long id);
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String username);
    Boolean existsByName(String username);
    Boolean existsByEmail(String email);

    Optional<User> findByProviderId(String id);
}
