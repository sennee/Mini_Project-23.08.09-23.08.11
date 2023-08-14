package com.example.miniProject4.service;

import com.example.miniProject4.user.UserInfo;
import com.example.miniProject4.user.UserInfoRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserInfoRepository userInfoRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserInfoRepository userInfoRepository, PasswordEncoder passwordEncoder) {
        this.userInfoRepository = userInfoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserInfo create(String username, String fullName, String email, String password) { //SignUpRepository를 사용하여 SignUp 데이터를 생성하는 함수
        UserInfo user = new UserInfo();
        user.setUsername(username);
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // SecurityConfig.java에 @Bean으로 객체 생성해놓음.
        this.userInfoRepository.save(user);
        return user;
    }

    public boolean login(String username, String rawPassword) {
        // 사용자 이름으로 DB에서 사용자 정보를 가져옴.
        UserInfo user = userInfoRepository.findByUsername(username).orElse(null);

        if (user != null) {
            // DB에 저장된 암호화된 비밀번호와 사용자가 입력한 비밀번호 비교
            return passwordEncoder.matches(rawPassword, user.getPassword());
        }

        return false;
    }

    public UserInfo getUserByUsername(String username) {
        return userInfoRepository.findByUsername(username).orElse(null);
    }


}
