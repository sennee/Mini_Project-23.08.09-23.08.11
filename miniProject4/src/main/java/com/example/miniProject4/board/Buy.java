package com.example.miniProject4.board;

import com.example.miniProject4.user.UserInfo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Buy { // Answer
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "TEXT")
    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;

    @ManyToOne
    private UserInfo buyer; // buyer : buy = 1 : n

    @ManyToOne
    private Sell sell;  //sell : buy = 1 : n
}
