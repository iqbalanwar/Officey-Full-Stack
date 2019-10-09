package com.example.officey.repository;

import com.example.officey.model.Comment;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
    @Query("FROM comments c WHERE c.user_id = ?0")
    public List<Comment> findCommentsByUserId(Long userId);

    @Query("FROM comments c WHERE c.post_id = ?0")
    public List<Comment> findByPostId(Long postId);
}
