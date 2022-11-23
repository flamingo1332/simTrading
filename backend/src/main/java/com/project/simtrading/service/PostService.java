package com.project.simtrading.service;

import com.project.simtrading.entity.Post;
import com.project.simtrading.payload.PostResponse;
import com.project.simtrading.payload.dto.PostDto;

import java.util.List;

public interface PostService {
    PostDto createPost(PostDto postDto, long id);

    PostResponse getAllPosts(int pageNo, int pageSize, String sortBy, String sortDir);

    List<PostDto> getAllPosts();

    PostDto getPostById(long id);

    PostDto updatePost(PostDto postDto, long id);

    void deletePost(long id);
}
