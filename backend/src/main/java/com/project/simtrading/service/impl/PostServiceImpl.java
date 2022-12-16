package com.project.simtrading.service.impl;

import com.project.simtrading.entity.Post;
import com.project.simtrading.entity.User;
import com.project.simtrading.exception.ResourceNotFoundException;
import com.project.simtrading.payload.PostRequest;
import com.project.simtrading.payload.reponseDto.PostDto;
import com.project.simtrading.repo.PostRepository;
import com.project.simtrading.repo.UserRepository;
import com.project.simtrading.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {


    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMappper;
    @Override
    public PostDto createPost(PostRequest request, long id) {
        User loggedUser = userRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("User", "id", id));

        Post post = new Post();
        post.setContent(request.getContent());
        post.setCoin(request.getCoin());
        post.setUser(loggedUser);

//        post.setLikes(new ArrayList<>());
//        post.setComments(new ArrayList<>());

        Post newPost = postRepository.save(post);

        System.out.println(newPost);
        return mapToDto(newPost);
    }

//    @Override
//    public PostResponse getAllPosts(int pageNo, int pageSize, String sortBy, String sortDir) {
//        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() :
//                Sort.by(sortBy).descending();
//
//        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
//
//        Page<Post> posts = postRepository.findAll(pageable);
//
//        List<Post> postList = posts.getContent();
//
//
//        PostResponse postResponse = new PostResponse();
//        postResponse.setContent(postList);
//        postResponse.setPageNo(posts.getNumber());
//        postResponse.setPageSize(posts.getSize());
//        postResponse.setTotalElements(posts.getTotalElements());
//        postResponse.setTotalPages(posts.getTotalPages());
//        postResponse.setLast(posts.isLast());
//        return postResponse;
//    }

    @Override
    public List<PostDto> getPostsByCoin(String coin) {
        List<Post> posts = postRepository.findAllByCoin(coin).orElse(new ArrayList<>());
        return posts.stream().map(post -> mapToDto(post)).collect(Collectors.toList());
    }


    @Override
    public PostDto getPostById(long id) {
        Post post = postRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Post", "id", id));

        return mapToDto(postRepository.save(post));
    }

    @Override
    public PostDto updatePost(PostRequest request, long id) {
        Post post = postRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Post", "id", id));

        post.setContent(request.getContent());
        post.setDateUpdated(LocalDateTime.now());

        return mapToDto(postRepository.save(post));
    }

    @Override
    public void deletePost(long id) {
        Post post = postRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Post", "id", id));
        postRepository.deleteById(id);
    }

    private PostDto mapToDto(Post post){
        return modelMappper.map(post, PostDto.class);
    }

    private Post mapToEntity(PostDto postDto){
        return modelMappper.map(postDto, Post.class);
    }
}
