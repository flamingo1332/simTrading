package com.project.simtrading.repo;

import com.project.simtrading.entity.Post;
import com.project.simtrading.entity.SubComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubCommentRepository extends JpaRepository<SubComment, Long> {
}
