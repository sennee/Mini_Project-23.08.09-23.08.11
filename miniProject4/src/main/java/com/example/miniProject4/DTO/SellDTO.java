package com.example.miniProject4.DTO;

import com.example.miniProject4.board.Sell;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class SellDTO {
    private Integer id;
    private String subject;
    private String content;
    private Integer price;
    private String imgName;
    private String imgPath;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    private String sellerUsername; // 판매자의 username 정보
    private List<BuyDTO> buylist;

    public static SellDTO fromSell(Sell sell) {
        SellDTO sellDTO = new SellDTO();
        sellDTO.setId(sell.getId());
        sellDTO.setSubject(sell.getSubject());
        sellDTO.setContent(sell.getContent());
        sellDTO.setPrice(sell.getPrice());
//        sellDTO.setPicture(sell.getPicture());
        sellDTO.setImgName(sell.getImgName());
        sellDTO.setImgPath(sell.getImgPath());
        sellDTO.setCreateDate(sell.getCreateDate());
        sellDTO.setModifyDate(sell.getModifyDate());
        sellDTO.setSellerUsername(sell.getSeller().getUsername()); // 판매자의 username 정보 설정

        // Set buyList here
        List<BuyDTO> buyDTOList = sell.getBuylist().stream()
                .map(BuyDTO::fromBuy)
                .collect(Collectors.toList());
        sellDTO.setBuylist(buyDTOList);

        return sellDTO;
    }
}
