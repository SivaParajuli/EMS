package com.aakivaa.emss.repo;

import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.users.UserC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCRepo extends JpaRepository<UserC,Long> {
    @Query(value = "SELECT c from UserC c where c.email = :e")
    Optional<UserC> findClientByEmail(@Param("e") String email);

    @Query(value = "SELECT r from UserC c join c.bookingList r where c.email= :e order by r.id desc")
    List<Booking> getAllBookingRequests(@Param("e") String email);

    @Transactional
    @Modifying
    @Query(value = "UPDATE UserC c SET c.name= :u,c.mobile_no= :m,c.password = :p where c.email = :e")
    Integer updateClient(@Param("u") String userName,
                         @Param("m") String mobile_no,
                         @Param("p") String password,
                         @Param("e")String email);

}
