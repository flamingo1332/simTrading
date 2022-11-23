package com.project.simtrading.service;

import com.project.simtrading.entity.Comment;
import com.project.simtrading.entity.SubComment;
import com.project.simtrading.payload.dto.SubCommentDto;

public interface SubCommentService {

    SubCommentDto createSubComment(SubCommentDto subCommentDto, long subCommentId, long subCommenterId);
    SubCommentDto updateComment(SubCommentDto commentDto, long id);
    void deleteComment(long id);
}
