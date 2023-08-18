package com.example.miniProject4.controller;

import com.example.miniProject4.DTO.SellDTO;
import com.example.miniProject4.board.Sell;
import com.example.miniProject4.board.SellRepository;
import com.example.miniProject4.service.SellBuyService;
import com.example.miniProject4.service.UserService;
import com.example.miniProject4.user.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SellController {

    private final SellRepository sellRepository;
    private final UserService userService;
    private final SellBuyService sellBuyService;

    @GetMapping("/board")
    public List<SellDTO> getSellList() {
        List<Sell> sells = sellRepository.findAll();
        return sells.stream()
                .map(SellDTO::fromSell)
                .collect(Collectors.toList());
    }

    @GetMapping("/board/{id}")
    public ResponseEntity<?> getSellDetail(@PathVariable("id") Integer id) {
        Optional<Sell> sellOptional = sellRepository.findById(id);

        if (sellOptional.isPresent()) {
            SellDTO sellDTO = SellDTO.fromSell(sellOptional.get());
            return ResponseEntity.ok(sellDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("판매글을 찾을 수 없습니다.");
        }
    }

    @PostMapping("/sell-create")
    public ResponseEntity<?> sellSubmit(@RequestParam("subject") String subject,
                                        @RequestParam("content") String content,
                                        @RequestParam("price") int price,
                                        @RequestParam("currentUser") String username,
                                        @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        System.out.println(subject);
        System.out.println(content);
        System.out.println(price);
        System.out.println(username);
        System.out.println(image);

        UserInfo seller = userService.getUserByUsername(username); // 해당 username으로 사용자 정보 가져오기

        if (seller == null) {
            return ResponseEntity.badRequest().body("사용자 정보를 찾을 수 없습니다.");
        }

        sellBuyService.createSell(subject, content,price,image, seller);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/buy-create/{id}")
    public ResponseEntity<?> buySubmit(@PathVariable("id") Integer id, @RequestBody Map<String, String> map) {
        Sell sell = sellRepository.getReferenceById(id);
        if (sell == null) {
            return ResponseEntity.notFound().build(); // 판매글을 찾지 못한 경우 404 응답
        }

        String buyText = map.get("buyText");
        String username = map.get("currentUser"); // 현재 로그인된 사용자의 currentUser을 받아옴

        UserInfo buyer = userService.getUserByUsername(username); // 해당 username으로 사용자 정보 가져오기
        if (buyer == null) {
            return ResponseEntity.badRequest().body("사용자 정보를 찾을 수 없습니다.");
        } else {
            // 판매글 댓글에 댓글 생성하여 추가
            sell.getBuylist().add(sellBuyService.createBuy(sell, buyText, buyer));
            sellRepository.save(sell);
            return ResponseEntity.ok().build();
        }
    }

    @PutMapping("/sell-modify/{id}")
    public ResponseEntity<String> updateSell(@PathVariable Integer id,
                                             @RequestParam("subject") String subject,
                                             @RequestParam("content") String content,
                                             @RequestParam("price") int price,
                                             @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        Sell sell = sellRepository.getReferenceById(id);
        if (sell == null) {
            return ResponseEntity.notFound().build();
        } else {
            try {
                sellBuyService.modifySell(sell, subject, content, price, image);
            } catch (NumberFormatException e) {
                sellBuyService.modifySell(sell, subject, content, 0, image);
            }

            return ResponseEntity.ok().build();
        }
    }

    @DeleteMapping("/sell-delete/{id}")
    public String deleteSell(@PathVariable Integer id) {
        Optional<Sell> sell = this.sellRepository.findById(id);
        if (sell.isPresent()) {
            Sell s = sell.get();
            sellBuyService.deleteSell(s);
            return null;
        } else {
            return "not delete";
        }
    }
}
