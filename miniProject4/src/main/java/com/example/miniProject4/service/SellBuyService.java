package com.example.miniProject4.service;

import com.example.miniProject4.board.Buy;
import com.example.miniProject4.board.BuyRepository;
import com.example.miniProject4.board.Sell;
import com.example.miniProject4.board.SellRepository;
import com.example.miniProject4.user.UserInfo;
import com.example.miniProject4.user.UserInfoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

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

    public Sell createSell(String subject, String content, Integer price, MultipartFile upload, UserInfo seller) throws IOException {
        Sell sell = new Sell();
        sell.setSubject(subject);
        sell.setContent(content);
        sell.setPrice(price);
        sell.setCreateDate(LocalDateTime.now());
        sell.setSeller(seller);

        saveImage(upload, sell);

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

    public Sell modifySell(Sell sell, String subject, String content, Integer price, MultipartFile upload) throws IOException {
        sell.setSubject(subject);
        sell.setContent(content);
        sell.setPrice(price);
        sell.setModifyDate(LocalDateTime.now());

        System.out.println("upload" + upload);
        if (upload == null){
            this.sellRepository.save(sell);
        } else {
            deleteImage(sell.getImgName()); // 이전 이미지 삭제
            saveImage(upload, sell);

            this.sellRepository.save(sell);
        }
        return sell;
    }

    public void deleteSell(Sell sell) {
        if (sell.getImgName() == null) {
            this.sellRepository.delete(sell);
        } else {
            deleteImage(sell.getImgName());
            this.sellRepository.delete(sell);
        }
    }

    private void saveImage(MultipartFile upload, Sell sell) throws IOException {

        String originalImgName = upload.getOriginalFilename();
        String uploadDir = "D:/BOOT CAMP/Mini_project (0809~0811)/item_images/";
        UUID uuid = UUID.randomUUID();
        String imgName = uuid + "_" + originalImgName;

        if (imgName.contains(".")) {
            File saveFile = new File(uploadDir,imgName);
            upload.transferTo(saveFile);

            sell.setImgName(imgName);
            sell.setImgPath("http://localhost:8080/files/" + imgName);
        }
    }

    public boolean deleteImage(String fileName) {

        String savedPath = "D:/BOOT CAMP/Mini_project (0809~0811)/item_images/";
        String oldImgPath = savedPath + fileName;
        File oldFile = new File(oldImgPath);

        if (oldFile.exists()) {
            boolean deleted = oldFile.delete();
            if (deleted) {
                System.out.println("파일 삭제 성공");
                return true;
            } else {
                System.out.println("파일 삭제 실패");
                return false;
            }
        } else {
            System.out.println("파일이 존재하지 않음 (이미 삭제됨)");
            return true; // 파일이 존재하지 않음 (이미 삭제됨)
        }

    }


}