package com.example.miniProject4.DTO;

import com.example.miniProject4.board.Buy;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BuyDTO {

    private Integer id;
    private String content;
    private LocalDateTime createDate;
    private String buyerUsername;

    public static BuyDTO fromBuy(Buy buy) {
        BuyDTO buyDTO = new BuyDTO();
        buyDTO.setId(buy.getId());
        buyDTO.setContent(buy.getContent());
        buyDTO.setCreateDate(buy.getCreateDate());
        buyDTO.setBuyerUsername(buy.getBuyer().getUsername());
        return buyDTO;
    }

}
