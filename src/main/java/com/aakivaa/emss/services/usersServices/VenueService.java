package com.aakivaa.emss.services.usersServices;

import com.aakivaa.emss.dto.EventAndServicesDto;
import com.aakivaa.emss.dto.PricingDto;
import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.Pricing;
import com.aakivaa.emss.models.users.Venue;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VenueService {

    List<VenueDto> findAll();

    Venue findVenueById(Long id);


    Venue findByEmail(String email);

    List<Venue> getVenuesByIds(List<Long> venueIdList);

    void deleteBYId(Long id);

    List<Booking> getRequestedBooking(Long id);

    List<Pricing> getAllPricing(Long id);

    List<VenueDto> getAllVerifiedVenue();

    List<Booking> getBookingList(Long id);


    List<?> getAllBookedDate(Long id);

    Integer getNumberOfNewRegistration();

    Integer getNumberOfBooking(String email);

    List<VenueDto> getRecommendation(Long id);

    Integer updateDetails(EventAndServicesDto eventAndServicesDto, Long id);

    Integer uploadImage(MultipartFile[] multipartFiles, Long id);

    Integer updatePricing(PricingDto pricing, Long id);
}
