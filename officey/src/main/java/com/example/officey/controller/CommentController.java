package com.example.officey.controller;

import com.example.officey.model.Comment;
import com.example.officey.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class CommentController {
    @Autowired
    CommentService commentService;

    @PostMapping("comment/{username}/{postId}/")
    public Comment createComment(@RequestBody Comment comment, @PathVariable String username, @PathVariable Long postId){
        return commentService.createCommentInDB(comment, postId, username);
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