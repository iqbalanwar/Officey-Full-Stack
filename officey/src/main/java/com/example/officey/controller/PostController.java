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

    @PostMapping("/post")
    public Post userCreatePost(@RequestBody Post post) {
        return postService.createPostInDB(post);
    }

//    @GetMapping("/post/{postId}")
//    public Post getSinglePost(@PathVariable Long postId) { return postService.getSinglePost(postId); }

    @GetMapping("post/list")
    public Iterable<Post> listAllPostsToUser() {
        return postService.listPosts();
    }

    @GetMapping("post/user/list")
    public Iterable<Post> listOnlyUserPosts() { return postService.listPostsOfUser(); }

    @DeleteMapping("post/{postId}")
    public String deletePostById(@PathVariable Long postId) {
        return postService.deletePostByIdInDB(postId);
    }
}
