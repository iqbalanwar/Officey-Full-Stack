package com.example.officey.controller;

import com.example.officey.model.Post;
import com.example.officey.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/post")
public class PostController {
    @Autowired
    PostService postService;

    @PostMapping("/{username}/post")
    public Post userCreatePost(@RequestBody Post post, @PathVariable String username) {
        return postService.createPostInDB(post, username);
    }

    @GetMapping("post/list")
    public Iterable<Post> listPostsToUser() {
        return postService.listPosts();
    }

    @DeleteMapping("post/{postId}")
    public String deletePostById(@PathVariable Long postId) {
        return postService.deletePostByIdInDB(postId);
    }
}
