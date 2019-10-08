package com.example.officey.service;

import com.example.officey.config.JwtUtil;
import com.example.officey.model.User;
import com.example.officey.repository.PostRepository;
import com.example.officey.repository.CommentRepository;
import com.example.officey.repository.UserRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.Assert.assertNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;


@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {

    @Mock
    UserRepository userRepository;


    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private PostService postService;

    @Mock
    private PostRepository postRepository;

    @Mock
    private CommentService commentService;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private User user;

    public UserServiceTest() {
    }

    @Before
    public void initializeDummyUser(){
        user.setUsername("batman");
        user.setPassword("robin");
    }

    @Test
    public void getUser_ReturnsUser_Success(){

        when(userRepository.findByUsername(anyString())).thenReturn(user);

        User tempUser = userService.getUser(user.getUsername());

        assertEquals(tempUser.getUsername(), user.getUsername());
    }

    @Test
    public void login_UserNotFound_Error(){

        when(userRepository.findByUsername(anyString())).thenReturn(null);

        String token = userService.login(user);

        assertNull(token);
    }
}
