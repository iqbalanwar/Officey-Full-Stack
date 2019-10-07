package com.example.officey.service;

import com.example.officey.model.Post;
import org.springframework.http.HttpStatus;

public interface PostService {
    public Post createPostInDB(Post post, String username);

    public Iterable<Post> listPosts();

    public String deletePostByIdInDB(Long postId);
}
