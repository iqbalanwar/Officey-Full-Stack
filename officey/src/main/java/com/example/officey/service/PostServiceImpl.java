package com.example.officey.service;

import com.example.officey.model.Post;
import com.example.officey.model.User;
import com.example.officey.repository.PostRepository;
import com.example.officey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Post createPostInDB(Post post, String username) {
        User user = userRepository.findByUsername(username);
        post.setUser(user);
        return postRepository.save(post);
    }

    @Override
    public Iterable<Post> listPosts() {
        return postRepository.findAll();
    }

    @Override
    public String deletePostByIdInDB(Long postId) {
        postRepository.deleteById(postId);
        return "Post has been deleted";
    }
}
