package com.example.miniProject4.user;

import com.example.miniProject4.board.Buy;
import com.example.miniProject4.board.Sell;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class UserInfo { // 회원정보를 저장하는 Entity

//    @Id()
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;

    @Id
    @Column(unique = true)
    private String username;

    @Column
    private String password;

    @Column
    private String fullName;

    @Column(unique = true)
    private String email;


    @OneToMany(mappedBy = "seller", cascade = CascadeType.REMOVE)
    private List<Sell> sellList;


    @OneToMany(mappedBy = "buyer", cascade = CascadeType.REMOVE)
    private List<Buy> buyList;

}
