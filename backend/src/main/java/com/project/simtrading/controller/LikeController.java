package com.project.simtrading.controller;

import com.project.simtrading.entity.Like;
import com.project.simtrading.security.CustomUserDetails;
import com.project.simtrading.service.LikeService;
import io.swagger.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("{postId}/likes")
    public ResponseEntity<Like> createLike(@PathVariable long postId,
                                           @AuthenticationPrincipal CustomUserDetails customUserDetails){
        return ResponseEntity.ok(likeService.createLike(postId, customUserDetails.getId()));
    }

    @DeleteMapping("/{id}/likes")
    public ResponseEntity<String> deleteLike(@PathVariable long id){
        likeService.deleteLike(id);
        return ResponseEntity.ok("Like cancelled");
    }

}
