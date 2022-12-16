package com.project.simtrading.service;


import com.project.simtrading.payload.CommentRequest;
import com.project.simtrading.payload.reponseDto.CommentDto;

import java.util.List;

public interface CommentService {

    CommentDto createComment(CommentRequest request, long postId, long commenterId);
    List<CommentDto> getCommentsByPostId(long postId);
    CommentDto updateComment(CommentDto commentDto, long id);
    void deleteComment(long id);
}
