package com.example.officey.service;

import com.example.officey.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService{

    public User getUser(String username);

    public Iterable<User> listUsers();

    public String createUser(User newUser);

    public String login(User user);

    public HttpStatus deleteUserById(Long userId);

//    public User addPost(String name, int postId);
}