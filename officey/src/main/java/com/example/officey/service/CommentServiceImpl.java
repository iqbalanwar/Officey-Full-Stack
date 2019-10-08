package com.example.officey.service;

import com.example.officey.controller.SecurityController;
import com.example.officey.model.Comment;
import com.example.officey.model.Post;
import com.example.officey.model.User;
import com.example.officey.repository.CommentRepository;
import com.example.officey.repository.PostRepository;
import com.example.officey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    SecurityController securityController;

    @Override
    public Comment createCommentInDB(Comment newComment, Long postId) {
        User user = userRepository.findByUsername(securityController.getCurrentUserName());
        newComment.setUser(user);

        Post post = postRepository.findById(postId).get();
        newComment.setPost(post);

        return commentRepository.save(newComment);
    }

    @Override
    public Iterable<Comment> listComments() {
        return commentRepository.findAll();
    }

    @Override
    public Iterable<Comment> listCommentsOfUser() {
        Long userId = userRepository.findByUsername(securityController.getCurrentUserName()).getId();
        return commentRepository.findCommentsByUserId(userId);
    }

    @Override
    public String deleteCommentByIdInDB(Long commentId) {
        commentRepository.deleteById(commentId);
        return "Comment has been deleted";
    }
}
