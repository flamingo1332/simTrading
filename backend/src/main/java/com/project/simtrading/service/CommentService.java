package com.project.simtrading.service;


import com.project.simtrading.entity.Comment;
import com.project.simtrading.payload.CommentResponse;
import com.project.simtrading.payload.dto.CommentDto;

public interface CommentService {

    CommentDto createComment(CommentDto commentDto, long postId, long commenterId);
    CommentResponse getCommentsByPostId(long postId, int pageNo, int pageSize, String sortBy, String sortDir);
    CommentDto updateComment(CommentDto commentDto, long id);
    void deleteComment(long id);
}
