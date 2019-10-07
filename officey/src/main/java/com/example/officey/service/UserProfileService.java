package com.example.officey.service;

import com.example.officey.model.UserProfile;

public interface UserProfileService {

    public UserProfile createUserProfile(String username, UserProfile newProfile);

    public UserProfile getUserProfile(String username);
}

//update userProfile fields