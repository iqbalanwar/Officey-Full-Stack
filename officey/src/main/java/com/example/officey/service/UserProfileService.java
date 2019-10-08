package com.example.officey.service;

import com.example.officey.model.UserProfile;

public interface UserProfileService {

    public UserProfile createUserProfile(UserProfile newProfile);

    public UserProfile getUserProfile();
}

//update userProfile fields