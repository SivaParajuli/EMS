package com.aakivaa.emss.repo;

import com.aakivaa.emss.enums.BookingStatus;
import com.aakivaa.emss.enums.VenueStatus;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.Images;
import com.aakivaa.emss.models.PricingForBooking;
import com.aakivaa.emss.models.functionsAndServices.AvailableServices;
import com.aakivaa.emss.models.functionsAndServices.FunctionTypes;
import com.aakivaa.emss.models.functionsAndServices.RecipeMenu;
import com.aakivaa.emss.models.users.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface VenueRepo extends JpaRepository<Venue, Long> {

    @Query(value = "select  v from Venue v  where  v.email= :e")
    Optional<Venue> findVenueByEmail(@Param("e") String email);

    @Query(value="select v from Venue v where v.venueStatus= :p ")
    List<Venue> findPendingRegister(@Param("p") VenueStatus status);

    @Query(value="select v from Venue v where v.venueStatus = :a ")
    List<Venue>findAllVerifiedVenue(@Param("a")VenueStatus venueStatus);


    @Query(value="SELECT r.bookingDate from Venue v join v.bookingList r where v.email= :e and r.bookingStatus <> :d")
    List<?> getBookedVenueDateById(@Param("e")String email,@Param("d") BookingStatus bookingStatus);

    @Query(value = "SELECT r from Venue v join v.bookingList r where v.id= :i and r.bookingStatus= :p")
    List<Booking> getAllPendingBookingRequest(@Param("i") Long id, @Param("p")BookingStatus bookingStatus);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Venue v SET v.venueStatus= :s where v.id = :i")
    Integer updateVenueStatus(@Param("s") VenueStatus vStatus,@Param("i")Long id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Venue v SET v.venueName= :n,v.userName= :u,v.city_name= :a,v.mobile_no= :c,v.password = :p,v.description= :d where v.email = :e")
    Integer update(@Param("n") String venueName,
                   @Param("u") String userName,
                   @Param("a") String address,
                   @Param("c") String contactNumber,
                   @Param("p") String password,
                   @Param("d") String description,
                   @Param("e")String email);
    @Transactional
    @Modifying
    @Query(value = "UPDATE Venue v SET v.capacity= :c,v.availableRooms= :r where v.id = :i")
    void updateDetails(@Param("c")String capacity,
                   @Param("r") String availableRooms,
                   @Param("i") Long id
    );

    @Transactional
    @Modifying
    @Query(value = "UPDATE Venue v SET v.description= :d where v.id = :i")
    void updateDescription(
                          @Param("d") String description,
                          @Param("i") Long id
    );


    @Query(value = "SELECT r from Venue v join v.bookingList r where v.id= :i order by r.id desc")
    List<Booking> getAllBookingList(@Param("i") Long id);

    @Query(value = "SELECT p from Venue v join v.pricing p where v.id= :i")
    List<PricingForBooking> getAllPriceRate(@Param("i") Long id);

    @Query(value = "SELECT COUNT(v) from Venue v where v.venueStatus= :p")
    Integer newRegistration(@Param("p")VenueStatus venueStatus);

    @Query(value = "SELECT COUNT(r.bookingStatus) from Venue v join v.bookingList r where v.email= :e and r.bookingStatus = :p")
    Integer getNumberOfBooking(@Param("e") String email,@Param("p")BookingStatus bookingStatus);


    @Query(value = "SELECT f from Venue v join v.functionList f where v.id= :i")
    List<FunctionTypes> getFunctionList(@Param("i") Long id);

    @Query(value = "SELECT r from Venue v join v.recipeMenuList r where v.id= :i")
    List<RecipeMenu> getRecipeList(@Param("i") Long id);

    @Query(value = "SELECT a from Venue v join v.availableServicesList a where v.id= :i")
    List<AvailableServices> getAvailableServiceList(@Param("i") Long id);

    @Query(value = "SELECT im from Venue v join v.listOfImages im where v.id= :i")
    List<Images> getImagesList(@Param("i") Long id);



}
