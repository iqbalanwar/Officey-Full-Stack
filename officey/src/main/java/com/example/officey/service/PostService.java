package com.example.officey.service;

import com.example.officey.model.Post;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public interface PostService {
    public Post createPostInDB(Post post);

    public Iterable<Post> listPosts();

    public Iterable<Post> listPostsOfUser();

//    public Post getSinglePost(Long postId);

    public ResponseEntity deletePostByIdInDB(Long postId);
}
