package com.example.officey.controller;

import com.example.officey.model.Comment;
import com.example.officey.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {
    @Autowired
    CommentService commentService;

    @PostMapping("/comment/{postId}")
    public Comment createComment(@PathVariable("postId") Long postId, @RequestBody Comment comment){
        return commentService.createCommentInDB(comment, postId);
    }

    @GetMapping("/comment/{postId}")
    public Iterable<Comment> listCommentsFromAPost(@PathVariable Long postId) {
        return commentService.listCommentsFromAPost(postId);
    }

    @GetMapping("/comment/user/list")
    public Iterable<Comment> listCommentsOfUser() {
        return commentService.listCommentsOfUser();
    }

    @GetMapping("comment/list")
    public Iterable<Comment> listComments(){
        return commentService.listComments();
    }

    @DeleteMapping("comment/{commentId}")
    public ResponseEntity deleteCommentById(@PathVariable Long commentId) {
        return commentService.deleteCommentByIdInDB(commentId);
    }
}