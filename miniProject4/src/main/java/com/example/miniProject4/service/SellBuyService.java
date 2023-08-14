package com.example.miniProject4.service;

import com.example.miniProject4.DTO.BuyDTO;
import com.example.miniProject4.DTO.SellDTO;
import com.example.miniProject4.board.Buy;
import com.example.miniProject4.board.BuyRepository;
import com.example.miniProject4.board.Sell;
import com.example.miniProject4.board.SellRepository;
import com.example.miniProject4.user.UserInfo;
import com.example.miniProject4.user.UserInfoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SellBuyService {

    private final UserInfoRepository userInfoRepository;
    private final SellRepository sellRepository;
    private final BuyRepository buyRepository;

    public SellBuyService(UserInfoRepository userInfoRepository, SellRepository sellRepository, BuyRepository buyRepository) {
        this.userInfoRepository = userInfoRepository;
        this.sellRepository = sellRepository;
        this.buyRepository = buyRepository;
    }

    public Sell createSell(String subject, String content, Integer price, UserInfo seller) {
        Sell sell = new Sell();
        sell.setSubject(subject);
        sell.setContent(content);
        sell.setPrice(price);
        sell.setCreateDate(LocalDateTime.now());
        sell.setSeller(seller);

        this.sellRepository.save(sell);

        return sell;
    }
    public Buy createBuy(Sell sell, String content, UserInfo buyer){
        Buy buy = new Buy();
        buy.setContent(content);
        buy.setCreateDate(LocalDateTime.now());
        buy.setSell(sell);
        buy.setBuyer(buyer);
        this.buyRepository.save(buy);
        return buy;
    }

    public Sell modifySell(Sell sell, String subject, String content, Integer price) {
        sell.setSubject(subject);
        sell.setContent(content);
        sell.setPrice(price);
        sell.setModifyDate(LocalDateTime.now());
        this.sellRepository.save(sell);
        return sell;
    }
}
