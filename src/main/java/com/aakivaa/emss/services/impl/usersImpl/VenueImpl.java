package com.aakivaa.emss.services.impl.usersImpl;

import com.aakivaa.emss.dto.EventAndServicesDto;
import com.aakivaa.emss.dto.ImgDesDto;
import com.aakivaa.emss.dto.PricingDto;
import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.enums.VenueStatus;
import com.aakivaa.emss.models.Pricing;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.repo.*;
import com.aakivaa.emss.repo.usersRepo.VenueRepo;
import com.aakivaa.emss.services.usersServices.VenueService;
import com.aakivaa.emss.utils.FileUtils;
import com.aakivaa.emss.utils.RecommenderUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VenueImpl implements VenueService {


    private final VenueRepo venueRepo;
    private final FileUtils fileUtils;
    private final RecommenderUtils recommenderUtils;
    private final PricingRepo pricingRepo;
    private final RatingAndReviewsRepo ratingAndReviewsRepo;
    private final BookingRepo bookingRepo;



    public VenueImpl(VenueRepo venueRepo, FileUtils fileUtils, RecommenderUtils recommenderUtils, PricingRepo pricingRepo, RatingAndReviewsRepo ratingAndReviewsRepo, BookingRepo bookingRepo) {
        this.venueRepo = venueRepo;
        this.fileUtils = fileUtils;
        this.recommenderUtils = recommenderUtils;
        this.pricingRepo = pricingRepo;
        this.ratingAndReviewsRepo = ratingAndReviewsRepo;
        this.bookingRepo = bookingRepo;
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
                .filePath(fileUtils.getBase64FileFromFilePath(entity.getFile()))
                .build()).collect(Collectors.toList());
    }



    @Override
    public Venue findVenueById(Long id) {
       return venueRepo.getById(id);
    }

    @Override
    public Venue findByEmail(String email) {
        return venueRepo.getByEmail(email);

    }

    @Override
    public List<Venue> getVenuesByIds(List<Long> venueIdList) {
        return venueRepo.findAllById(venueIdList);
    }


    @Override
    public void deleteBYId(Long id) {
        venueRepo.deleteById(id);
    }




    @Override
    public List<Pricing> getAllPricing(Long id) {
        List<Pricing> requestList = pricingRepo.getAllPricing(id);
        return requestList.stream().map(entity -> Pricing.builder()
                .functionName(entity.getFunctionName())
                .priceRange(entity.getPriceRange())
                .guestRange(entity.getGuestRange())
                .preference(entity.getPreference())
                .recipeMenu(entity.getRecipeMenu())
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
                .images(fileUtils.makePathToImage(entity.getListOfImages()))
                .ratings(ratingAndReviewsRepo.findAverageRatingByVenue(venueRepo.getById(entity.getId())))
                .build()).collect(Collectors.toList());
    }



    @Override
    public VenueDto getDetailsOfVenue(Long id) {
        Venue venue = venueRepo.getById(id);
        return VenueDto.builder()
                .venueName(venue.getVenueName())
                .userName(venue.getUserName())
                .citizenShipNo(venue.getCitizenshipNo())
                .availableRooms(venue.getAvailableRooms())
                .description(venue.getDescription())
                .email(venue.getEmail())
                .capacity(venue.getCapacity())
                .city_name(venue.getCity_name())
                .mobile_no(venue.getMobile_no())
                .ratings(ratingAndReviewsRepo.findAverageRatingByVenue(venueRepo.getById(id)))
                .recipeMenuLists(venue.getRecipeMenu())
                .functionTypes(venue.getFunctionTypes())
                .services(venue.getAvailableServices())
                .images(fileUtils.makePathToImage(venue.getListOfImages()))
                .reviews(ratingAndReviewsRepo.getReviews(venue))
                .build();
    }




    @Override
    public Integer getNumberOfNewRegistration() {
        return venueRepo.newRegistration(VenueStatus.PENDING);
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
                .filePath(fileUtils.getBase64FileFromFilePath(entity.getFile()))
                .email(entity.getEmail())
                .mobile_no(entity.getMobile_no())
                .userName(entity.getUserName())
                .build()).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Integer updateDetails(EventAndServicesDto eventAndServicesDto, Long id) {
        Optional<Venue> optionalVenue = venueRepo.findById(id);
        if (optionalVenue.isPresent()) {
            Venue venue = optionalVenue.get();
            venue.setRecipeMenu(eventAndServicesDto.getRecipe());
            venue.setFunctionTypes(eventAndServicesDto.getFunctionTypes());
            venue.setAvailableServices(eventAndServicesDto.getAvailableServices());
            venue.setAvailableRooms(eventAndServicesDto.getAvailableRooms());
            venue.setCapacity(eventAndServicesDto.getCapacity());

        }
        return 1;
    }

    @Transactional
    @Override
    public Integer uploadImage(ImgDesDto imgDesDto, Long id) {
        List<MultipartFile> imageList = imgDesDto.getImageList();
        List<String> listOfImages = new ArrayList<>();
        for(MultipartFile image:imageList) {
            try {
                String path = fileUtils.storeFile(image);
                listOfImages.add(path);
            }catch (IOException e){
                e.printStackTrace();
            }
        }
        Optional<Venue> optionalVenue = venueRepo.findById(id);
        if (optionalVenue.isPresent()) {
            Venue venue = optionalVenue.get();
            venue.setDescription(imgDesDto.getDescription());
            venue.setListOfImages(listOfImages);
        }
        return 1;
    }


    @Override
    public Pricing updatePricing(PricingDto pricingDto, Long id) {
        Venue venue = venueRepo.getById(id);
        Pricing pricing1 = Pricing.builder()
                .functionName(pricingDto.getFunctionName())
                .guestRange(pricingDto.getGuest())
                .recipeMenu(pricingDto.getRecipe())
                .preference(pricingDto.getPreference())
                .priceRange(pricingDto.getPrice())
                .venue(venue)
                .build();
        Pricing entity = pricingRepo.save(pricing1);
        return Pricing.builder()
                .functionName(entity.getFunctionName())
                .preference(entity.getPreference())
                .priceRange(entity.getPriceRange())
                .build();
    }
}