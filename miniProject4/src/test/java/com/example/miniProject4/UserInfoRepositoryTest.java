package com.example.miniProject4;

import com.example.miniProject4.user.UserInfo;
import com.example.miniProject4.user.UserInfoRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class UserInfoRepositoryTest {

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void testJpa_1() { // db에 데이터가 잘 들어가는지, 연동이 잘 되었는지 확인
        UserInfo user1 = new UserInfo();
        user1.setUsername("sjo05140");
        user1.setFullName("심세은");
        user1.setPassword("Se980125!");
        user1.setEmail("sjo05140@naver.com");
        this.userInfoRepository.save(user1);

        UserInfo user2 = new UserInfo();
        user2.setUsername("khnkhn0707");
        user2.setFullName("김한나");
        user2.setPassword("gkssk4110^^");
        user2.setEmail("khnkhn0707@naver.com");
        this.userInfoRepository.save(user2);
    }

    @Test
    void  testJpa_2() { //username이 sjo05140
        Optional<UserInfo> user = this.userInfoRepository.findByUsername("sjo05140");
//        Assertions.assertTrue(signUp.isPresent());
        if (user.isPresent()) {
            UserInfo u = user.get();
            Assertions.assertEquals("심세은", u.getFullName());
        }
    }

    @Test
    void testJpa_3() {
        Optional<UserInfo> user = this.userInfoRepository.findByUsername("sjo05140");
        Assertions.assertTrue(user.isPresent());

        if (user.isPresent()) {
            UserInfo u = user.get();
            boolean passwordMatch = passwordEncoder.matches("1029", u.getPassword());
            Assertions.assertTrue(passwordMatch);
        }
    }
}
