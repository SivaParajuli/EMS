package com.aakivaa.emss.services.usersServices;

import com.aakivaa.emss.dto.EventAndServicesDto;
import com.aakivaa.emss.dto.ImgDesDto;
import com.aakivaa.emss.dto.PricingDto;
import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.models.Pricing;
import com.aakivaa.emss.models.users.Venue;

import java.util.List;

public interface VenueService {

    List<VenueDto> findAll();

    Venue findById(Long id);


    Venue findByEmail(String email);

    void deleteBYId(Long id);

    List<Pricing> getAllPricing(Long id);

    List<VenueDto> getAllVerifiedVenue();


    VenueDto getDetailsOfVenue(Long id);

    Integer getNumberOfNewRegistration();

    Integer updateDetails(EventAndServicesDto eventAndServicesDto, Long id);

    Integer uploadImage(ImgDesDto imgDesDto, Long id);

    Pricing updatePricing(PricingDto pricing, Long id);

    List<VenueDto> getRecommendations(Long userId);
}
