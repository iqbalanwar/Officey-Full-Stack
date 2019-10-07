package com.example.officey.service;

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

    @Override
    public Comment createCommentInDB(Comment comment, Long postId, String username) {
        User user = userRepository.findByUsername(username);
        comment.setUser(user);

        Post post = postRepository.findPostById(postId);
        comment.setPost(post);

        return commentRepository.save(comment);
    }

    @Override
    public Iterable<Comment> listComments() {
        return commentRepository.findAll();
    }

    @Override
    public String deleteCommentByIdInDB(Long commentId) {
        commentRepository.deleteById(commentId);
        return "Comment has been deleted";
    }
}
