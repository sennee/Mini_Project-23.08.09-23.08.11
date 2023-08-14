package com.example.miniProject4.controller;

import com.example.miniProject4.service.UserService;
import com.example.miniProject4.user.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController //모든 메소드가 이제부터 다 Rest로 동작
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> map) {

        try {
//            System.out.println("너 들어오니??");
            userService.create(map.get("username"), map.get("fullName"), map.get("email"),map.get("password1"));
            return ResponseEntity.ok().build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body("이미 등록된 사용자입니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("어쨋든 에러다.");
        }
    }

    @PostMapping("/login") // 정상작동하는 코드
    public ResponseEntity<?> login(@RequestBody Map<String, String> map) {
        try {
            String username = map.get("username");
            String password = map.get("password");

            // 로그인 처리 (비밀번호 검증)
            boolean loginSuccess = userService.login(username, password);

            if (loginSuccess) {
//                return ResponseEntity.ok().build();
                return new ResponseEntity<>(username, HttpStatus.OK);
            } else {
                return ResponseEntity.badRequest().body("로그인 실패");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("로그인 에러");
        }
    }
}
