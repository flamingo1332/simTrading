package com.project.simtrading.service.impl;

import com.project.simtrading.entity.Like;
import com.project.simtrading.entity.Post;
import com.project.simtrading.entity.User;
import com.project.simtrading.exception.ResourceNotFoundException;
import com.project.simtrading.repo.LikeRepository;
import com.project.simtrading.repo.PostRepository;
import com.project.simtrading.repo.UserRepository;
import com.project.simtrading.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeServiceImpl implements LikeService {
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;



    @Override
    public Like createLike(long postId, long userId) {
        Like like = new Like();
        User user = userRepository.findById(userId).orElseThrow(()
                -> new ResourceNotFoundException("User", "id", userId));

       Post post = postRepository.findById(postId).orElseThrow(()
                -> new ResourceNotFoundException("Post", "id", postId));

//        Like like1 = likeRepository.findByUserAndPost(user, post);

        like.setUser(user);
        like.setPost(post);
        post.getLikes().add(like);
        return likeRepository.save(like);
    }

    @Override
    public void deleteLike(long id) {
        Like like = likeRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("Like", "id", id));
        likeRepository.delete(like);
    }
}
