package com.project.simtrading.service.impl;

import com.project.simtrading.entity.Comment;
import com.project.simtrading.entity.Post;
import com.project.simtrading.entity.User;
import com.project.simtrading.exception.ResourceNotFoundException;
import com.project.simtrading.payload.request.CommentRequest;
import com.project.simtrading.payload.reponse.CommentDto;
import com.project.simtrading.repo.CommentRepository;
import com.project.simtrading.repo.PostRepository;
import com.project.simtrading.repo.UserRepository;
import com.project.simtrading.service.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public CommentDto createComment(CommentRequest request, long postId, long commenterId) {
        Post post = postRepository.findById(postId).orElseThrow(()
                -> new ResourceNotFoundException("Post", "id", postId));

        User loggedUser = userRepository.findById(commenterId).orElseThrow(()
                -> new ResourceNotFoundException("User", "id", commenterId));

        Comment comment = new Comment();
        comment.setBody(request.getBody());
        comment.setPost(post);
        comment.setUser(loggedUser);

        Comment newComment = commentRepository.save(comment);
        return mapToDto(newComment);
    }

    @Override
    public List<CommentDto> getCommentsByPostId(long postId) {
//        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() :
//                Sort.by(sortBy).descending();
//
//        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
//
//        Page<Comment> comments = commentRepository.findAllByPostId(postId, pageable);
//
//        List<Comment> commentList = comments.getContent();
//        List<CommentDto> commentDtoList = commentList.stream().map(c -> mapToDto(c)).collect(Collectors.toList());
//
//        CommentResponse commentResponse = new CommentResponse();
//        commentResponse.setContent(commentDtoList);
//        commentResponse.setPageNo(comments.getNumber());
//        commentResponse.setPageSize(comments.getSize());
//        commentResponse.setTotalElements(comments.getTotalElements());
//        commentResponse.setTotalPages(comments.getTotalPages());
//        commentResponse.setLast(comments.isLast());

        List<Comment> commentList = commentRepository.findAllByPostId(postId);
        return commentList.stream().map(comment -> mapToDto(comment)).collect(Collectors.toList());
    }

    @Override
    public CommentDto updateComment(CommentDto commentDto, long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Comment", "id", id));
        comment.setBody(commentDto.getBody());

        Comment newComment = commentRepository.save(comment);
        return mapToDto(newComment);
    }

    @Override
    public void deleteComment(long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Comment", "id", id));
        commentRepository.delete(comment);
    }


    private CommentDto mapToDto(Comment comment) {
        CommentDto commentDto = mapper.map(comment, CommentDto.class);
        return commentDto;
    }

    private Comment mapToEntity(CommentDto commentDto) {
        Comment comment = mapper.map(commentDto, Comment.class);
        return comment;
    }
}
