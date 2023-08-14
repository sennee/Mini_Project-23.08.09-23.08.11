package com.example.miniProject4.board;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SellRepository extends JpaRepository<Sell, Integer>{
    Optional<Sell> findById(Integer id);
}
