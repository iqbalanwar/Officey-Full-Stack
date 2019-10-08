package com.example.officey.service;

import com.example.officey.model.Comment;
import com.example.officey.model.Post;

public interface CommentService {
    public Comment createCommentInDB(Comment newComment, Long postId);

    public Iterable<Comment> listComments();

    public Iterable<Comment> listCommentsOfUser();

    public Iterable<Comment> listCommentsFromAPost(Long postId);

    public String deleteCommentByIdInDB(Long postId);
}
