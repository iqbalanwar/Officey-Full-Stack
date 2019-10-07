package com.example.officey.service;

import com.example.officey.model.User;
import com.example.officey.model.UserProfile;
import com.example.officey.repository.UserProfileRepository;
import com.example.officey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileServiceImpl implements UserProfileService{
    @Autowired
    UserProfileRepository userProfileRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public UserProfile createUserProfile(String username, UserProfile newProfile) {
        User user = userRepository.findByUsername(username);
        newProfile.setUser(user);
        return userProfileRepository.save(newProfile);
    }

    @Override
    public UserProfile getUserProfile(String username) {
        return userProfileRepository.findProfileByUsername(username);
    }
}
