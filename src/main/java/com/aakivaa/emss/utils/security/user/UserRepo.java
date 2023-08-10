package com.aakivaa.emss.utils.security.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Repository
public interface UserRepo extends JpaRepository<User,Long> {
    Optional<User> findUserByEmail(String username);

    @Transactional
    @Modifying
    @Query(value = "UPDATE User u SET u.uname = :n,u.password = :p where u.email = :e")
    Integer update(@Param("n") String username,
                   @Param("p") String password,
                   @Param("e")String email);
}
