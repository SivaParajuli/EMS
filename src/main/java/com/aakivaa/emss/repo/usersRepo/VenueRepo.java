package com.aakivaa.emss.repo.usersRepo;

import com.aakivaa.emss.dto.EventAndServicesDto;
import com.aakivaa.emss.dto.ImgDesDto;
import com.aakivaa.emss.enums.BookingStatus;
import com.aakivaa.emss.enums.VenueStatus;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.Pricing;
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

    @Query(value="select v from Venue v where v.venueStatus= :p ")
    List<Venue> findPendingRegister(@Param("p") VenueStatus status);

    @Query(value="select v from Venue v where v.venueStatus = :a ")
    List<Venue>findAllVerifiedVenue(@Param("a")VenueStatus venueStatus);


    @Transactional
    @Modifying
    @Query(value = "UPDATE Venue v SET v.venueStatus= :s where v.id = :i")
    Integer updateVenueStatus(@Param("s") VenueStatus vStatus,@Param("i")Long id);



    @Query(value = "SELECT COUNT(v) from Venue v where v.venueStatus= :p")
    Integer newRegistration(@Param("p")VenueStatus venueStatus);






}
