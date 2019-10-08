package com.example.officey.service;

import com.example.officey.model.Comment;
import com.example.officey.model.Post;

public interface CommentService {
    public Comment createCommentInDB(Comment newComment, String username, Long postId);

    public Iterable<Comment> listComments();

    public String deleteCommentByIdInDB(Long postId);
}
