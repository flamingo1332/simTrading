package com.project.simtrading.service.impl;

import com.project.simtrading.entity.Comment;
import com.project.simtrading.entity.Post;
import com.project.simtrading.entity.SubComment;
import com.project.simtrading.entity.User;
import com.project.simtrading.exception.ResourceNotFoundException;
import com.project.simtrading.payload.dto.CommentDto;
import com.project.simtrading.payload.dto.SubCommentDto;
import com.project.simtrading.repo.CommentRepository;
import com.project.simtrading.repo.SubCommentRepository;
import com.project.simtrading.repo.UserRepository;
import com.project.simtrading.service.SubCommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubCommentServiceImpl implements SubCommentService {
    @Autowired
    private SubCommentRepository subCommentRepository;
    @Autowired
    private CommentRepository CommentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper mapper;


    @Override
    public SubCommentDto createSubComment(SubCommentDto subCommentDto, long commentId, long subCommenterId) {
        Comment comment = CommentRepository.findById(commentId).orElseThrow(()
                -> new ResourceNotFoundException("Comment", "id", commentId));

        User loggedUser = userRepository.findById(subCommenterId).orElseThrow(()
                -> new ResourceNotFoundException("User", "id", subCommenterId));

        SubComment subComment = mapToEntity(subCommentDto);
        subComment.setComment(comment);
        subComment.setUser(loggedUser);

        SubComment newSubComment = subCommentRepository.save(subComment);
        return mapToDto(newSubComment);
    }

    @Override
    public SubCommentDto updateComment(SubCommentDto subCommentDto, long id) {
        SubComment subComment = subCommentRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("SubComment", "id", id));
        subComment.setBody(subComment.getBody());
        SubComment newSubComment = subCommentRepository.save(subComment);
        return mapToDto(newSubComment);
    }

    @Override
    public void deleteComment(long id) {
        SubComment subComment = subCommentRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("SubComment", "id", id));
        subCommentRepository.delete(subComment);
    }

    private SubCommentDto mapToDto(SubComment subComment) {
        SubCommentDto subCommentDto = mapper.map(subComment, SubCommentDto.class);
        return subCommentDto;
    }

    private SubComment mapToEntity(SubCommentDto subCommentDto) {
        SubComment subComment = mapper.map(subCommentDto, SubComment.class);
        return subComment;
    }
}
