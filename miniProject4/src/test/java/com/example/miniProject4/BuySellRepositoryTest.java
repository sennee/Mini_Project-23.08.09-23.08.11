package com.example.miniProject4;

import com.example.miniProject4.board.Buy;
import com.example.miniProject4.board.BuyRepository;
import com.example.miniProject4.board.Sell;
import com.example.miniProject4.board.SellRepository;
import com.example.miniProject4.user.UserInfo;
import com.example.miniProject4.user.UserInfoRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Optional;

@SpringBootTest
public class BuySellRepositoryTest {

    @Autowired
    private SellRepository sellRepository;

    @Autowired
    private BuyRepository buyRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Test
    void testJpa_1() {
        Optional<UserInfo> user = this.userInfoRepository.findByUsername("sjo05140");
        UserInfo seller = user.get();

        Sell s1 = new Sell();

        s1.setSubject("2023 맥북 프로 16인치 팔아요");
        s1.setContent("사용감은 좀 있지만 깔끔해요");
        s1.setPrice(2500000);
        s1.setCreateDate(LocalDateTime.now());
        s1.setSeller(seller);
        sellRepository.save(s1);
    }

    @Test
    void testJpa_2() {
        Optional<UserInfo> user = this.userInfoRepository.findByUsername("mini");
        UserInfo buyer = user.get();

        Optional<Sell> sell = this.sellRepository.findById(1);
        Assertions.assertTrue(sell.isPresent());
        Sell s = sell.get();

        Buy b1 = new Buy();
        b1.setContent("에눌 가능한가요");
        b1.setSell(s);
        b1.setCreateDate(LocalDateTime.now());
        b1.setBuyer(buyer);
        buyRepository.save(b1);
    }
}
