package com.project.simtrading.controller;

import com.project.simtrading.entity.Like;
import com.project.simtrading.entity.Post;
import com.project.simtrading.payload.PostResponse;
import com.project.simtrading.payload.dto.PostDto;
import com.project.simtrading.repo.UserRepository;
import com.project.simtrading.security.CustomUserDetails;
import com.project.simtrading.security.jwt.JwtAuthenticationFilter;
import com.project.simtrading.security.jwt.JwtTokenProvider;
import com.project.simtrading.service.LikeService;
import com.project.simtrading.service.PostService;
import com.project.simtrading.utils.AppConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;


    @PostMapping
    public ResponseEntity<PostDto> createPost(@Valid @RequestBody PostDto postDto,
//                                           @AuthenticationPrincipal CustomUserDetails customUserDetails,
                                           long id){
        return ResponseEntity.ok(postService.createPost(postDto, id));
    }



    @GetMapping
    public PostResponse getAllPosts(
            @RequestParam(value = "pageNo", defaultValue = AppConst.DEFAULT_PAGE_NO, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppConst.DEFAULT_PAGE_SIZE_POST, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConst.DEFAULT_SORT_BY, required = false)String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConst.DEFAULT_SORT_DIRECTION, required = false)String sortDir){
        return postService.getAllPosts(pageNo, pageSize, sortBy, sortDir);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable long id){
        PostDto postDto = postService.getPostById(id);
        return ResponseEntity.ok(postDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDto> updatePost(@Valid @RequestBody PostDto postDto, @PathVariable long id){
        return ResponseEntity.ok(postService.updatePost(postDto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable long id){
        postService.deletePost(id);
        return ResponseEntity.ok("Post successfully deleted");
    }
}
