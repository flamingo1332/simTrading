package com.project.simtrading.repo;

import com.project.simtrading.entity.Like;
import com.project.simtrading.entity.Post;
import com.project.simtrading.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Like findByUserAndPost(User user, Post post);
}
