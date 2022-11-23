package com.project.simtrading.repo;

import com.project.simtrading.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostId(long postId);
    Page<Comment> findAllByPostId(long postId, Pageable pageable);
}
