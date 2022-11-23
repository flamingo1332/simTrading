package com.project.simtrading.service.impl;

import com.project.simtrading.entity.Post;
import com.project.simtrading.entity.User;
import com.project.simtrading.exception.ResourceNotFoundException;
import com.project.simtrading.payload.PostResponse;
import com.project.simtrading.payload.dto.PostDto;
import com.project.simtrading.repo.PostRepository;
import com.project.simtrading.repo.UserRepository;
import com.project.simtrading.security.jwt.JwtAuthenticationFilter;
import com.project.simtrading.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import springfox.documentation.swagger2.mappers.ModelSpecificationMapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {


    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public PostDto createPost(PostDto postDto, long id) {
        Post post = mapToEntity(postDto);

        // 테스트용 임시
        User loggedUser = userRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("User", "id", id));

        post.setUser(loggedUser);
        Post newPost = postRepository.save(post);
        return mapToDto(newPost);
    }

    @Override
    public PostResponse getAllPosts(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<Post> posts = postRepository.findAll(pageable);

        List<Post> postList = posts.getContent();
        List<PostDto> postDtoList = postList.stream().map(post -> mapToDto(post)).collect(Collectors.toList());


        PostResponse postResponse = new PostResponse();
        postResponse.setContent(postDtoList);
        postResponse.setPageNo(posts.getNumber());
        postResponse.setPageSize(posts.getSize());
        postResponse.setTotalElements(posts.getTotalElements());
        postResponse.setTotalPages(posts.getTotalPages());
        postResponse.setLast(posts.isLast());
        return postResponse;
    }

    @Override
    public List<PostDto> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        List<PostDto> postDtoList = posts.stream().map(post -> mapToDto(post)).collect(Collectors.toList());
        return postDtoList;
    }

    @Override
    public PostDto getPostById(long id) {
        Post post = postRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Post", "id", id));
        post.setView(post.getView() + 1);

        return mapToDto(post);
    }

    @Override
    public PostDto updatePost(PostDto postDto, long id) {
        Post post = postRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Post", "id", id));
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setDateUpdated(LocalDateTime.now());

        Post newPost = postRepository.save(post);
        return mapToDto(newPost);
    }

    @Override
    public void deletePost(long id) {
        Post post = postRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Post", "id", id));
        postRepository.deleteById(id);
    }


    private PostDto mapToDto(Post post) {
        PostDto postDto = mapper.map(post, PostDto.class);
        return postDto;
    }

    private Post mapToEntity(PostDto postDto) {
        Post post = mapper.map(postDto, Post.class);
        return post;
    }
}
