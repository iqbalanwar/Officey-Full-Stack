package com.example.officey.repository;

import com.example.officey.model.Post;
import com.example.officey.model.User;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends CrudRepository<Post, Long> {
    @Query(" {'user' : ?0} ")
    public List<Post> findPostsByUser(User user);

    @Query(" {'id' : ?0} ")
    public Post findPostById(Long postId);
}
