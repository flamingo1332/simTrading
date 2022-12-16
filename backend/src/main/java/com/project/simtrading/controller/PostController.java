package com.project.simtrading.controller;

import com.project.simtrading.payload.PostRequest;
import com.project.simtrading.payload.reponseDto.PostDto;
import com.project.simtrading.security.CustomUserDetails;
import com.project.simtrading.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;


    @PostMapping
    public ResponseEntity<PostDto> createPost(@Valid @RequestBody PostRequest request,
                                              @AuthenticationPrincipal CustomUserDetails customUserDetails){
        return ResponseEntity.ok(postService.createPost(request, customUserDetails.getId()));
    }

//    @GetMapping("/test")
//    public ResponseEntity<List<PostDto>> getPostsTest(){
//        return ResponseEntity.ok(postService.getAllPosts());
//    }

    @GetMapping("/{coin}")
    public ResponseEntity<List<PostDto>> getPostsByCoin(@PathVariable(name = "coin") String coin){
        return ResponseEntity.ok(postService.getPostsByCoin(coin));
    }

    @GetMapping("/{id}/user")
    public ResponseEntity<PostDto> getPostById(@PathVariable long id){
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDto> updatePost(@Valid @RequestBody PostRequest request, @PathVariable long id){
        return ResponseEntity.ok(postService.updatePost(request, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable long id){
        postService.deletePost(id);
        return ResponseEntity.ok("Post successfully deleted");
    }
}
