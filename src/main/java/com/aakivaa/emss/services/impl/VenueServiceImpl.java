package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.enums.BookingStatus;
import com.aakivaa.emss.enums.VenueStatus;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.Images;
import com.aakivaa.emss.models.PricingForBooking;
import com.aakivaa.emss.models.functionsAndServices.AvailableServices;
import com.aakivaa.emss.models.functionsAndServices.RecipeMenu;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.repo.*;
import com.aakivaa.emss.services.VenueService;
import com.aakivaa.emss.utils.FileStorageUtils;
import com.aakivaa.emss.utils.RecommenderUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VenueServiceImpl implements VenueService {


    private final VenueRepo venueRepo;
    private final FunctionRepo functionRepo;
    private final FileStorageUtils fileStorageUtils;
    private final RecommenderUtils recommenderUtils;
    private final ImagesRepo imagesRepo;
    private final FunctionsTypesRepo functionsTypesRepo;
    private final AvailableServicesRepo availableServicesRepo;
    private final RecipeMenuRepo recipeMenuRepo;
    private final PricingForBookingRepo pricingForBookingRepo;



    public VenueServiceImpl(VenueRepo venueRepo, FunctionRepo functionRepo, FileStorageUtils fileStorageUtils, RecommenderUtils recommenderUtils, ImagesRepo imagesRepo, FunctionsTypesRepo functionsTypesRepo, AvailableServicesRepo availableServicesRepo, RecipeMenuRepo recipeMenuRepo, PricingForBookingRepo pricingForBookingRepo) {
        this.venueRepo = venueRepo;
        this.functionRepo = functionRepo;
        this.fileStorageUtils = fileStorageUtils;
        this.recommenderUtils = recommenderUtils;
        this.imagesRepo = imagesRepo;
        this.functionsTypesRepo = functionsTypesRepo;
        this.availableServicesRepo = availableServicesRepo;
        this.recipeMenuRepo = recipeMenuRepo;
        this.pricingForBookingRepo = pricingForBookingRepo;
    }
    Logger logger = LoggerFactory.getLogger(VenueServiceImpl.class);

    @Override
    public List<VenueDto> findAll() {
        List<Venue> venueList = venueRepo.findAll();
        return venueList.stream().map(entity -> VenueDto.builder()
                .venueName(entity.getVenueName())
                .userName(entity.getUserName())
                .capacity(entity.getCapacity())
                .mobile_no(entity.getMobile_no())
                .email(entity.getEmail())
                .city_name(entity.getCity_name())
                .filePath(fileStorageUtils.getBase64FileFromFilePath(entity.getFile()))
                .build()).collect(Collectors.toList());
    }

    @Override
    public VenueDto findVenueByEmail(String email) {
        Optional<Venue> venue = venueRepo.findVenueByEmail(email);
        if (venue.isPresent()) {
            Venue venue1 = venue.get();
            return VenueDto.builder()
                    .id(venue1.getId())
                    .userName(venue1.getUserName())
                    .description(venue1.getDescription())
                    .venueName(venue1.getVenueName())
                    .capacity(venue1.getCapacity())
                    .email(venue1.getEmail())
                    .mobile_no(venue1.getMobile_no())
                    .city_name(venue1.getCity_name())
                    .build();
        }
        return null;
    }

    @Override
    public VenueDto findById(Long id) {
        Optional<Venue> venue = venueRepo.findById(id);
        if (venue.isPresent()) {
            Venue venue1 = venue.get();
            return VenueDto.builder()
                    .venueName(venue1.getVenueName())
                    .city_name(venue1.getCity_name())
                    .capacity(venue1.getCapacity())
                    .mobile_no(venue1.getMobile_no())
                    .email(venue1.getEmail())
                    .userName(venue1.getUserName())
                    .build();
        }
        return null;
    }

    @Override
    public void deleteBYId(Long id) {
        venueRepo.deleteById(id);
    }

    @Override
    public Integer update(VenueDto venueDto, String email) {
        return null;
    }

    @Override
    public List<Booking> getRequestedBooking(String email) {
        List<Booking> requestList = venueRepo.getAllPendingBookingRequest(email, BookingStatus.PENDING);
        return requestList.stream().map(entity -> Booking.builder()
                .id(entity.getId())
                .bookingDate(entity.getBookingDate())
                .userC(entity.getUserC())
                .contactNumber(entity.getContactNumber())
                .eventType(entity.getEventType())
                .calculatedPayment(entity.getCalculatedPayment())
                .requiredCapacity(entity.getRequiredCapacity())
                .build()).collect(Collectors.toList());
    }



    public List<VenueDto> getAllVerifiedVenue() {

        List<Venue> venueList = venueRepo.findAllVerifiedVenue(VenueStatus.VERIFIED);
        return venueList.stream().map(entity -> VenueDto.builder()
                .id(entity.getId())
                .venueName(entity.getVenueName())
                .mobile_no(entity.getMobile_no())
                .email(entity.getEmail())
                .city_name(entity.getCity_name())
                .capacity(entity.getCapacity())
                .userName(entity.getUserName())
                .description(entity.getDescription())
                .filePath(fileStorageUtils.getBase64FileFromFilePath(entity.getFile()))
                .build()).collect(Collectors.toList());
    }

    @Override
    public List<Booking> getBookingList(String email) {
        List<Booking> requestList = venueRepo.getAllBookingList(email);
        return requestList.stream().map(entity -> Booking.builder()
                .id(entity.getId())
                .bookingDate(entity.getBookingDate())
                .userC(entity.getUserC())
                .contactNumber(entity.getContactNumber())
                .bookingStatus(entity.getBookingStatus())
                .eventType(entity.getEventType())
                .calculatedPayment(entity.getCalculatedPayment())
                .requiredCapacity(entity.getRequiredCapacity())
                .build()).collect(Collectors.toList());
    }

    @Override
    public List<?> getAllBookedDate(String email) {
        List<?> dateList = venueRepo.getBookedVenueDateById(email, BookingStatus.CANCELED);
        return new ArrayList<>(dateList);
    }


    @Override
    public Integer getNumberOfNewRegistration() {
        Integer newRegistration = venueRepo.newRegistration(VenueStatus.PENDING);
        return newRegistration;
    }

    @Override
    public Integer getNumberOfBooking(String email) {
        Integer numberOfBooking = venueRepo.getNumberOfBooking(email , BookingStatus.PENDING);
        return numberOfBooking;
    }

    public List<Venue> getRecommendation(String email) {
        List<Venue> venueList = new ArrayList<>();
         List <Long> venueIdList = recommenderUtils.getVenueRecommendations(findVenueByEmail(email).getId(),10);
         for(Long venueId : venueIdList){
             Venue venue = venueRepo.getById(venueId);
             venueList.add(venue);
         }
         return venueList;
    }

    @Override
    public Integer updateDetails(VenueDto venueDto, Long id) {
        Venue venue = venueRepo.getById(id);
         Arrays.stream(venueDto.getMultipartFiles()).forEach(file->{
             try {
                 String path = fileStorageUtils.storeFile(file);
                 Images image=Images.builder()
                         .filePath(path)
                         .venue(venue)
                         .build();
                 imagesRepo.save(image);
             } catch (IOException e) {
                 e.printStackTrace();
             }
         });

        Arrays.stream(venueDto.getAvailableServices()).forEach(availableServices -> {
            AvailableServices availableServices1 = AvailableServices.builder()
                    .name(availableServices.getName())
                    .venue(venue)
                    .build();
            availableServicesRepo.save(availableServices1);
        });
        Arrays.stream(venueDto.getRecipeMenuList()).forEach(recipeMenu -> {
            RecipeMenu recipeMenu1 = RecipeMenu.builder()
                    .items(recipeMenu.getItems())
                    .price(recipeMenu.getPrice())
                    .name(recipeMenu.getName())
                    .venue(venue)
                    .build();
            recipeMenuRepo.save(recipeMenu1);
        });
        venueRepo.updateDetails(
                venueDto.getCapacity(),
                venueDto.getAvailableRooms(),
                venue.getDescription(),
                id
        );
        return 1;
    }

    @Override
    public Integer updatePricing(PricingForBooking pricing, Long id) {
        Venue venue = venueRepo.getById(id);
        PricingForBooking pricing1 = PricingForBooking.builder()
                .functionName(pricing.getFunctionName())
                .guest(pricing.getGuest())
                .preference(pricing.getPreference())
                .price(pricing.getPrice())
                .venue(venue)
                .build();
        pricingForBookingRepo.save(pricing1);
        return 1;
    }
}
