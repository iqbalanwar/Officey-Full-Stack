//package com.example.officey.controller;
//
//import com.example.officey.model.Comment;
//import com.example.officey.service.CommentService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/comment")
//public class CommentController {
//    @Autowired
//    CommentService commentService;
//
//    @PostMapping
//    public Comment createComment(@RequestBody Comment comment){
//        return commentService.createComment(comment);
//    }
//    @GetMapping("/list")
//    public Iterable<Comment>listComments(){
//        return commentService.listComments();
//    }
//
//    @DeleteMapping("/{commentId}")
//    public HttpStatus deleteCommentById(@PathVariable Integer commentId) {
//        return commentService.deleteById(commentId);
//    }
//
//}
//
