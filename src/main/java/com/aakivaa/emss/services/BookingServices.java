package com.aakivaa.emss.services;



import com.aakivaa.emss.dto.BookingDto;
import com.aakivaa.emss.models.Booking;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface BookingServices {


    Booking VenueBookingRequest(BookingDto bookingDto, Long vid ,Long id) throws IOException;
    Integer VenueBookingResponse(Long id , Integer integer);
    List<Booking> getRequestedBooking(Long id);
    List<Booking> getBookingList(Long id);

    List<Booking> getBookingResponses(String email);

    List<LocalDate> getAllBookedDate(Long id);
    Integer getNumberOfBooking(Long id);

    Booking findById(Long id);

    List<LocalDate> getDateByIds(Long vid, Long uid);
}
