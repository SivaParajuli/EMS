package com.aakivaa.emss.services;



import com.aakivaa.emss.dto.BookingDto;
import com.aakivaa.emss.models.Booking;

import java.io.IOException;

public interface BookingServices {


    Booking VenueBookingRequest(BookingDto bookingDto, String vEmail, String email) throws IOException;

    Integer VenueBookingResponse(Integer bookingStatus, Long id);

    Booking findById(Long id);
}
