package com.project.simtrading.service;

import com.project.simtrading.payload.request.PostRequest;
import com.project.simtrading.payload.reponse.PostDto;

import java.util.List;

public interface PostService {
    PostDto createPost(PostRequest request, long id);

//    PostResponse getAllPosts(int pageNo, int pageSize, String sortBy, String sortDir);

    List<PostDto> getPostsByCoin(String coin);

    PostDto getPostById(long id);

    PostDto updatePost(PostRequest request, long id);

    void deletePost(long id);
}
