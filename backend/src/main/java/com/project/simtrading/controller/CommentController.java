package com.project.simtrading.controller;

import com.project.simtrading.payload.CommentRequest;
import com.project.simtrading.payload.CommentResponse;
import com.project.simtrading.payload.dto.CommentDto;
import com.project.simtrading.security.CustomUserDetails;
import com.project.simtrading.service.CommentService;
import com.project.simtrading.utils.AppConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class CommentController {
    @Autowired
    private CommentService commentService;



    @GetMapping("/posts/{postId}/comments")
    public CommentResponse getCommentsByPostId(
            @PathVariable(name = "postId") long postId,
            @RequestParam(value = "pageNo", defaultValue = AppConst.DEFAULT_PAGE_NO, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppConst.DEFAULT_PAGE_SIZE_COMMENT, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConst.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConst.DEFAULT_SORT_DIRECTION, required = false) String sortDir) {
        return commentService.getCommentsByPostId(postId, pageNo, pageSize, sortBy, sortDir);
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
