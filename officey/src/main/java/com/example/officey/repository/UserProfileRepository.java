package com.example.officey.repository;

import com.example.officey.model.UserProfile;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserProfileRepository extends CrudRepository<UserProfile, Long> {

//    @Query("from UserProfile up left join User u on u.username = ?1 and up.id = u.userProfile.id")
//    public UserProfile findProfileByUsername(String username);

//    @Query("FROM UserProfile up INNER JOIN User u ON u.username = ?1 AND up.id = u.userProfile.id")
//    public UserProfile findProfileByUsername(String username);
}