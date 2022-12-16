package com.project.simtrading.controller;

import com.project.simtrading.payload.CommentRequest;
import com.project.simtrading.payload.reponseDto.CommentDto;
import com.project.simtrading.security.CustomUserDetails;
import com.project.simtrading.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {
    @Autowired
    private CommentService commentService;



    @GetMapping("/posts/{postId}/comments")
    public List<CommentDto> getCommentsByPostId(@PathVariable(name = "postId") long postId) {
        return commentService.getCommentsByPostId(postId);
    }

    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<CommentDto> createComment(@PathVariable(name = "postId") long postId,
                                                    @Valid @RequestBody CommentRequest request,
                                                    @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(commentService.createComment(request, postId, customUserDetails.getId()));
    }

    @PutMapping("/comments/{id}")
    public ResponseEntity<CommentDto> updateComment(@PathVariable(name = "id") long id,
                                                 @RequestBody CommentDto commentDto) {
        return ResponseEntity.ok(commentService.updateComment(commentDto, id));
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable(name = "id") long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok("Comment successfully deleted");
    }


}
