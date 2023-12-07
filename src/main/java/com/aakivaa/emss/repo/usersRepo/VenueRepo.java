package com.aakivaa.emss.repo.usersRepo;

import com.aakivaa.emss.enums.Status;
import com.aakivaa.emss.models.users.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface VenueRepo extends JpaRepository<Venue, Long> {

    @Query(value = "select  v from Venue v  where  v.email= :e")
    Venue  getByEmail(@Param("e") String email);

    @Query(value="select v from Venue v where v.status= :p ")
    List<Venue> findPendingRegister(@Param("p") Status status);

    @Query(value="select v from Venue v where v.status = :a ")
    List<Venue>findAllVerifiedVenue(@Param("a") Status status);


    @Transactional
    @Modifying
    @Query(value = "UPDATE Venue v SET v.status= :s where v.id = :i")
    Integer updateVenueStatus(@Param("s") Status vStatus, @Param("i")Long id);



    @Query(value = "SELECT COUNT(v) from Venue v where v.status= :p")
    Integer newRegistration(@Param("p") Status status);

}
