package com.project.simtrading.service;

import com.project.simtrading.entity.Like;

public interface LikeService {
    Like createLike(long postId, long userId);
    void deleteLike(long id);
}
