package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.dto.EventTypeAndServicesDto;
import com.aakivaa.emss.dto.PricingDto;
import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.enums.BookingStatus;
import com.aakivaa.emss.enums.VenueStatus;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.Images;
import com.aakivaa.emss.models.PricingForBooking;
import com.aakivaa.emss.models.functionsAndServices.AvailableServices;
import com.aakivaa.emss.models.functionsAndServices.FunctionTypes;
import com.aakivaa.emss.models.functionsAndServices.RecipeMenu;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.repo.*;
import com.aakivaa.emss.services.VenueService;
import com.aakivaa.emss.utils.FileStorageUtils;
import com.aakivaa.emss.utils.RecommenderUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VenueServiceImpl implements VenueService {


    private final VenueRepo venueRepo;
    private final FileStorageUtils fileStorageUtils;
    private final RecommenderUtils recommenderUtils;
    private final ImagesRepo imagesRepo;
    private final FunctionsTypesRepo functionsTypesRepo;
    private final AvailableServicesRepo availableServicesRepo;
    private final RecipeMenuRepo recipeMenuRepo;
    private final PricingForBookingRepo pricingForBookingRepo;
    private final RatingAndReviewsRepo ratingAndReviewsRepo;



    public VenueServiceImpl(VenueRepo venueRepo, FileStorageUtils fileStorageUtils, RecommenderUtils recommenderUtils, ImagesRepo imagesRepo, FunctionsTypesRepo functionsTypesRepo, AvailableServicesRepo availableServicesRepo, RecipeMenuRepo recipeMenuRepo, PricingForBookingRepo pricingForBookingRepo, RatingAndReviewsRepo ratingAndReviewsRepo) {
        this.venueRepo = venueRepo;
        this.fileStorageUtils = fileStorageUtils;
        this.recommenderUtils = recommenderUtils;
        this.imagesRepo = imagesRepo;
        this.functionsTypesRepo = functionsTypesRepo;
        this.availableServicesRepo = availableServicesRepo;
        this.recipeMenuRepo = recipeMenuRepo;
        this.pricingForBookingRepo = pricingForBookingRepo;
        this.ratingAndReviewsRepo = ratingAndReviewsRepo;
    }

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
                    .filePath(fileStorageUtils.getBase64FileFromFilePath(venue1.getFile()))
                    .ratings(ratingAndReviewsRepo.findAverageRatingByVenue(venueRepo.getById(venue1.getId())))
                    .availableRooms(venue1.getAvailableRooms())
                    .build();
        }
        return null;
    }


    @Override
    public List<Venue> getVenuesByIds(List<Long> venueIdList) {
        return venueRepo.findAllById(venueIdList);
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
    public List<Booking> getRequestedBooking(Long id) {
        List<Booking> requestList = venueRepo.getAllPendingBookingRequest(id, BookingStatus.PENDING);
        return requestList.stream().map(entity -> Booking.builder()
                .id(entity.getId())
                .bookingDate(entity.getBookingDate())
                .userC(entity.getUserC())
                .eventType(entity.getEventType())
                .requiredCapacity(entity.getRequiredCapacity())
                .bookingStatus(entity.getBookingStatus())
                .preference(entity.getPreference())
                .build()).collect(Collectors.toList());
    }


    @Override
    public List<PricingForBooking> getAllPricing(Long id) {
        List<PricingForBooking> requestList = venueRepo.getAllPriceRate(id);
        return requestList.stream().map(entity -> PricingForBooking.builder()
                .id(entity.getId())
                .functionName(entity.getFunctionName())
                .price(entity.getPrice())
                .guest(entity.getGuest())
                .preference(entity.getPreference())
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
                .ratings(ratingAndReviewsRepo.findAverageRatingByVenue(venueRepo.getById(entity.getId())))
                .build()).collect(Collectors.toList());
    }

    @Override
    public List<Booking> getBookingList(Long id) {
        List<Booking> requestList = venueRepo.getAllBookingList(id);
        return requestList.stream().map(entity -> Booking.builder()
                .id(entity.getId())
                .bookingDate(entity.getBookingDate())
                .userC(entity.getUserC())
                .bookingStatus(entity.getBookingStatus())
                .eventType(entity.getEventType())
                .requiredCapacity(entity.getRequiredCapacity())
                .build()).collect(Collectors.toList());
    }

    @Override
    public VenueDto getDetailsOfVenue(Long id) {
        List<Images> images = venueRepo.getImagesList(id);
        List<FunctionTypes> functions= venueRepo.getFunctionList(id);
        List<AvailableServices> services = venueRepo.getAvailableServiceList(id);
        List<RecipeMenu> menus = venueRepo.getRecipeList(id);
        List<String> files = new ArrayList<>();
        Venue venue = venueRepo.getById(id);
        images.forEach(image-> {
             String filePath = fileStorageUtils.getBase64FileFromFilePath(image.getFilePath());
             files.add(filePath);
        });

        return VenueDto.builder()
                .venueName(venue.getVenueName())
                .availableRooms(venue.getAvailableRooms())
                .mobile_no(venue.getMobile_no())
                .city_name(venue.getCity_name())
                .listOfFilePaths(files)
                .availableServicesList(services.stream().map(availableServices -> AvailableServices.builder()
                        .name(availableServices.getName())
                        .build()).collect(Collectors.toList()))
                .functionTypesList(functions.stream().map(functionTypes -> FunctionTypes.builder()
                        .functionName(functionTypes.getFunctionName())
                        .build()).collect(Collectors.toList()))
                .recipeMenuLists(menus.stream().map(recipeMenu -> RecipeMenu.builder()
                        .name(recipeMenu.getName())
                        .build()).collect(Collectors.toList()))
                .capacity(venue.getCapacity())
                .email(venue.getEmail())
                .userName(venue.getUserName())
                .description(venue.getDescription())
                .filePath(fileStorageUtils.getBase64FileFromFilePath(venue.getFile()))
                .ratings(ratingAndReviewsRepo.findAverageRatingByVenue(venueRepo.getById(id)))
                .build();
    }

    @Override
    public List<?> getAllBookedDate(String email) {
        List<?> dateList = venueRepo.getBookedVenueDateById(email, BookingStatus.CANCELED);
        return new ArrayList<>(dateList);
    }


    @Override
    public Integer getNumberOfNewRegistration() {
        return venueRepo.newRegistration(VenueStatus.PENDING);
    }

    @Override
    public Integer getNumberOfBooking(String email) {
        return venueRepo.getNumberOfBooking(email , BookingStatus.PENDING);
    }

    public List<VenueDto> getRecommendation(Long id) {
        List<Venue> venueList = new ArrayList<>();
         List <Long> venueIdList = recommenderUtils.getVenueRecommendations(id,10);
         for(Long venueId : venueIdList){
             Venue venue = venueRepo.getById(venueId);
             venueList.add(venue);
         }
        return venueList.stream().map(entity -> VenueDto.builder()
                .id(entity.getId())
                .venueName(entity.getVenueName())
                .availableRooms(entity.getAvailableRooms())
                .capacity(entity.getCapacity())
                .city_name(entity.getCity_name())
                .description(entity.getDescription())
                .filePath(fileStorageUtils.getBase64FileFromFilePath(entity.getFile()))
                .email(entity.getEmail())
                .mobile_no(entity.getMobile_no())
                .userName(entity.getUserName())
                .availableServicesList(entity.getAvailableServicesList())
                .build()).collect(Collectors.toList());
    }

    @Override
    public Integer updateDetails(EventTypeAndServicesDto eventTypeAndServicesDto, Long id) {
        Venue venue = venueRepo.getById(id);

        Arrays.stream(eventTypeAndServicesDto.getFunctionTypes()).forEach(functionTypes -> {
            FunctionTypes functionTypes1 = FunctionTypes.builder()
                    .functionName(functionTypes)
                    .venue(venue)
                    .build();
            functionsTypesRepo.save(functionTypes1);
        });

        Arrays.stream(eventTypeAndServicesDto.getAvailableServices()).forEach(availableServices -> {
            AvailableServices availableServices1 = AvailableServices.builder()
                    .name(availableServices)
                    .venue(venue)
                    .build();
            availableServicesRepo.save(availableServices1);
        });
//        venueDto.getRecipeMenuList().forEach(recipeMenu -> {
//            RecipeMenu recipeMenu1 = RecipeMenu.builder()
//                    .items(recipeMenu.getItems())
//                    .price(recipeMenu.getPrice())
//                    .name(recipeMenu.getName())
//                    .venue(venue)
//                    .build();
//            recipeMenuRepo.save(recipeMenu1);
//        });
        venueRepo.updateDetails(
                eventTypeAndServicesDto.getCapacity(),
                eventTypeAndServicesDto.getAvailableRooms(),
                id
        );
        return 1;
    }

    @Override
    public Integer uploadImage(MultipartFile[] multipartFiles, Long id) {
        Venue venue = venueRepo.getById(id);
        Arrays.stream(multipartFiles).forEach(file ->{
            try {
                Images image=Images.builder()
                        .filePath(fileStorageUtils.storeFile(file))
                        .venue(venue)
                        .build();
                imagesRepo.save(image);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        return 1;
    }

    @Override
    public Integer updatePricing(PricingDto pricingDto, Long id) {
        Venue venue = venueRepo.getById(id);
        PricingForBooking pricing1 = PricingForBooking.builder()
                .functionName(pricingDto.getFunctionName())
                .guest(pricingDto.getGuest())
                .preference(pricingDto.getPreference())
                .price(pricingDto.getPrice())
                .venue(venue)
                .build();
        PricingForBooking pricing = pricingForBookingRepo.save(pricing1);
        Arrays.stream(pricingDto.getRecipe()).forEach(recipeMenu -> {
            RecipeMenu recipeMenu1 = RecipeMenu.builder()
                    .name(recipeMenu)
                    .pricingForBooking(pricingForBookingRepo.getById(pricing.getId()))
                    .venue(venue)
                    .build();
            recipeMenuRepo.save(recipeMenu1);
        });
        return 1;
    }
}
