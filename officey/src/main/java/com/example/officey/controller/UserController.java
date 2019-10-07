package com.example.officey.controller;

import com.example.officey.model.JwtResponse;
import com.example.officey.model.User;
import com.example.officey.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        return ResponseEntity.ok(new JwtResponse(userService.createUser(newUser)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        return ResponseEntity.ok(new JwtResponse(userService.login(user)));
    }

    // Can only the admin see the list of all users?
    // We'll think about this more later
    // @PreAuthorize("hasRole('ROLE_ADMIN')") <-- this line caused an error. Will fix later
    @GetMapping("/user/list")
    public Iterable<User> listUsers() {
        return userService.listUsers();
    }

//    @PutMapping("/user/{username}/{postId}")
//    public User addPost(@PathVariable String username, @PathVariable int postId) {
//        return userService.addPost(username, postId);
//    }
//
//    @PutMapping("/user/{username}/{commentId}")
//    public User addComment(@PathVariable String username, @PathVariable int commentId) {
//        return userService.addComment(username, commentId);
//    }

    @DeleteMapping("/user/{userId}")
    public HttpStatus deleteUserById(@PathVariable Long userId) {
        return userService.deleteUserById(userId);
    }

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello World!!";
    }

}