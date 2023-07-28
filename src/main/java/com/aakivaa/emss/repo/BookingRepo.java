package com.aakivaa.emss.repo;

import com.aakivaa.emss.enums.BookingStatus;
import com.aakivaa.emss.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface BookingRepo extends JpaRepository<Booking,Long> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE Booking b SET b.bookingStatus = :s where b.id = :i")
    Integer updateBookingStatus(@Param("s") BookingStatus bStatus, @Param("i")Long id);
}
