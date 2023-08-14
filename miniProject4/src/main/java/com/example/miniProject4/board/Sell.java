package com.example.miniProject4.board;

import com.example.miniProject4.user.UserInfo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Sell { // Question

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 100)
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column
    private Integer price;

    @Column
    private String picture;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime modifyDate;

    @ManyToOne
    private UserInfo seller; // seller : sell = 1 : n

    @OneToMany(mappedBy = "sell", cascade = CascadeType.REMOVE) // buy : sell = n : 1
    private List<Buy> buylist;

}
