package com.example.officey.service;

import com.example.officey.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserServiceStub implements UserService {

    @Override
    public User getUser(String username) {
        User user = new User();
        user.setUsername(username);
        return user;
    }

    @Override
    public Iterable<User> listUsers() {
        return null;
    }

    @Override
    public String createUser(User newUser) {
        return "Created User";
    }

    @Override
    public String login(User user) {
        return "User Logged in";
    }

    @Override
    public HttpStatus deleteUserById(Long userId) {
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }


}
