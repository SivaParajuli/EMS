package com.aakivaa.emss.repo;

import com.aakivaa.emss.enums.BookingStatus;
import com.aakivaa.emss.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepo extends JpaRepository<Booking,Long> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE Booking b SET b.bookingStatus = :s where b.id = :i")
    Integer updateBookingStatus(@Param("s") BookingStatus bStatus, @Param("i")Long id);

    @Query(value = "SELECT b from Booking b where b.venue.id= :i and b.bookingStatus= :p")
    List<Booking> getPendingRequests(@Param("i") Long id, @Param("p")BookingStatus bookingStatus);

    @Query(value = "SELECT b from Booking b where b.venue.id= :i order by b.id desc")
    List<Booking> getAllBookingList(@Param("i") Long id);

    @Query(value="SELECT b.bookingDate from Booking b where b.venue.id= :i and b.bookingStatus = :d")
    List<LocalDate> getBookedDateById(@Param("i")Long id,@Param("d") BookingStatus bookingStatus);

    @Query(value="SELECT b.bookingDate from Booking b where b.userC.id=:i and b.venue.id= :id and b.bookingStatus = :s")
    List<LocalDate> getDatesByIds(@Param("i")Long uid, @Param("id") Long vid, @Param("s") BookingStatus bookingStatus);

    @Query(value = "SELECT COUNT(b.bookingStatus) from Booking b where b.venue.id= :i and b.bookingStatus = :p")
    Integer getNumberOfBooking(@Param("i") Long id,@Param("p")BookingStatus bookingStatus);
}
