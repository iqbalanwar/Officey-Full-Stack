package com.example.officey.service;

import com.example.officey.controller.SecurityController;
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

    @Autowired
    SecurityController securityController;

    @Override
    public UserProfile createUserProfile(UserProfile newProfile) {
        User user = userRepository.findByUsername(securityController.getCurrentUserName());
        newProfile.setUser(user);
        user.setUserProfile(newProfile);
        return userProfileRepository.save(newProfile);
    }

    @Override
    public UserProfile getUserProfile() {
        User username = userRepository.findByUsername(securityController.getCurrentUserName());
        return username.getUserProfile();

    }
}
