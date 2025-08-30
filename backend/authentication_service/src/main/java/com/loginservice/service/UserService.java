package com.loginservice.service;

import com.loginservice.model.User;
import com.loginservice.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(); // ✅ initialize encoder
    }

    // ✅ Register new user (encrypt password before saving)
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    public Long getUser(String username) {
        return userRepository.findByUsername(username)
                .map(User::getId)
                .orElse(0L);
    }
    // ✅ Login (match raw password with stored hashed password)
    public boolean login(String username, String password) {
        return userRepository.findByUsername(username)
                .map(user -> passwordEncoder.matches(password, user.getPassword()))
                .orElse(false);
    }

}
