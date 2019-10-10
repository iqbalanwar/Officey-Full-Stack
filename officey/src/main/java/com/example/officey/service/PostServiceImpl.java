package com.example.officey.service;

import com.example.officey.controller.SecurityController;
import com.example.officey.model.Post;
import com.example.officey.model.User;
import com.example.officey.repository.PostRepository;
import com.example.officey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.Authenticator;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SecurityController securityController;

    @Override
    public Post createPostInDB(Post post) {
        String username = securityController.getCurrentUserName();
        User user = userRepository.findByUsername(username);
        post.setUser(user);
        return postRepository.save(post);
    }

    @Override
    public Iterable<Post> listPosts() {
        return postRepository.findAll();
    }

    @Override
    public Iterable<Post> listPostsOfUser() {
        String username = securityController.getCurrentUserName();
        Long userId = userRepository.findByUsername(username).getId();
        return postRepository.findPostsByUserId(userId);
    }

//    @Override
//    public Post getSinglePost(Long postId) {
//        return postRepository.findPostById(postId);
//    }

    @Override
    public ResponseEntity deletePostByIdInDB(Long postId) {
        String username = securityController.getCurrentUserName();
        if(postRepository.findById(postId).get().getUser().getUsername().equals(username)) {
            postRepository.deleteById(postId);
            return new ResponseEntity(HttpStatus.valueOf(200));
        } else {
            return new ResponseEntity(HttpStatus.valueOf(405));
        }
    }
}
