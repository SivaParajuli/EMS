package com.aakivaa.emss.services;



import com.aakivaa.emss.dto.BookingDto;
import com.aakivaa.emss.models.Booking;

import java.io.IOException;

public interface BookingServices {


    Booking VenueBookingRequest(BookingDto bookingDto, Long vid ,Long id) throws IOException;

    Integer VenueBookingResponse(Long id , Integer integer);

    Booking findById(Long id);
}
