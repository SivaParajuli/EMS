package com.aakivaa.emss.services;

import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.PricingForBooking;
import com.aakivaa.emss.models.users.Venue;

import java.util.List;

public interface VenueService {

    List<VenueDto> findAll();

    VenueDto findVenueByEmail(String email);


    VenueDto findById(Long id);

    void deleteBYId(Long id);

    Integer update(VenueDto venueDto , String email);

    List<Booking> getRequestedBooking(String email);

    List<VenueDto> getAllVerifiedVenue();

    List<Booking> getBookingList(String email);

    VenueDto getDetailsOfVenue(Long id);

    List<?> getAllBookedDate(String email);

    Integer getNumberOfNewRegistration();

    Integer getNumberOfBooking(String email);

    List<Venue> getRecommendation(String email);

    Integer updateDetails(VenueDto venueDto , Long id);

    Integer updatePricing(PricingForBooking pricing, Long id);





}
