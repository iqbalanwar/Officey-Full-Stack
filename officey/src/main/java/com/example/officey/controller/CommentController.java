package com.example.officey.controller;

import com.example.officey.model.Comment;
import com.example.officey.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {
    @Autowired
    CommentService commentService;

    @PostMapping("/{username}/{postId}/comment")
    public Comment createComment(@PathVariable("username") String username, @PathVariable("postId") Long postId, @RequestBody Comment comment){
        return commentService.createCommentInDB(comment, username, postId);
    }

    @GetMapping("comment/list")
    public Iterable<Comment>listComments(){
        return commentService.listComments();
    }

    @DeleteMapping("comment/{commentId}")
    public String deleteCommentById(@PathVariable Long commentId) {
        return commentService.deleteCommentByIdInDB(commentId);
    }
}