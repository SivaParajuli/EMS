package com.aakivaa.emss.controller;
import com.aakivaa.emss.dto.*;
import com.aakivaa.emss.models.*;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.repo.VenueRepo;
import com.aakivaa.emss.services.BookingServices;
import com.aakivaa.emss.services.RatingAndReviewService;
import com.aakivaa.emss.services.UserCService;
import com.aakivaa.emss.services.VenueService;
import com.aakivaa.emss.utils.EmailSenderService;
import com.aakivaa.emss.utils.FileStorageUtils;
import com.aakivaa.emss.utils.RecommenderUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path="client-")

public class UserCController extends BaseController{


        private final BookingServices bookingServices;
        private final VenueService venueService;
        private final UserCService userCService;
        private final EmailSenderService emailSenderService;
        private final RatingAndReviewService ratingAndReviewService;
        private final RecommenderUtils recommenderUtils;
        private  final VenueRepo venueRepo;
        private final FileStorageUtils fileStorageUtils;


    public UserCController(BookingServices bookingServices, VenueService venueService, UserCService userCService, EmailSenderService emailSenderService, RatingAndReviewService ratingAndReviewService, RecommenderUtils recommenderUtils, VenueRepo venueRepo, FileStorageUtils fileStorageUtils) {
        this.bookingServices = bookingServices;
        this.venueService = venueService;
        this.userCService = userCService;
        this.emailSenderService = emailSenderService;
        this.ratingAndReviewService = ratingAndReviewService;
        this.recommenderUtils = recommenderUtils;
        this.venueRepo = venueRepo;
        this.fileStorageUtils = fileStorageUtils;
    }

    @GetMapping("clientHome")
        public ResponseEntity<ResponseDto> getAllVerifiedVenue(){
            List<VenueDto> venueList =venueService.getAllVerifiedVenue();
            return new ResponseEntity<>
                    (successResponse("Verified venue fetched", venueList), HttpStatus.OK);
        }

        @GetMapping(path="{email}")
        public ResponseEntity<ResponseDto> findUser(@PathVariable String email){
            UserC currentUser =userCService.findClientByEmail(email);
            if(currentUser !=null){
                return new ResponseEntity<>
                        (successResponse("CurrentUser", currentUser), HttpStatus.OK);
            }
            else
                return new ResponseEntity<>
                        (errorResponse("sorry",null),HttpStatus.BAD_REQUEST);
        }


        @PostMapping(path="book-venue/{vEmail}/{email}")
        public ResponseEntity<ResponseDto> BookingRequest(@RequestBody BookingDto bookingDto, @PathVariable("vEmail") String vEmail,
                                                          @PathVariable("email") String email) throws IOException {
            Booking booking1 = bookingServices.VenueBookingRequest(bookingDto,venueService.findVenueByEmail(vEmail).getId(),
                    userCService.findClientByEmail(email).getId());
            if(booking1 !=null){
                emailSenderService.sendEmail(vEmail,
                        "Booking Request",
                        "You have Booking request for "+bookingDto.getBookingDate()+". Please response in time .");

                return new ResponseEntity<>
                        (successResponse("Request Sent", bookingDto), HttpStatus.OK);
            }
            else
                return new ResponseEntity<>
                        (errorResponse("There is some error to send request .please try again",null),HttpStatus.BAD_REQUEST);
        }

        @GetMapping(path="bookedDate/{email}")
        public ResponseEntity<ResponseDto> getAllBookedDate(@PathVariable("email")String email){
            List<?> dateList =venueService.getAllBookedDate(email);
            return new ResponseEntity<>
                    (successResponse("Date List fetched.", dateList),HttpStatus.OK);
        }

        @CrossOrigin(origins = "*",methods = RequestMethod.PUT,maxAge = 86400,allowedHeaders = "*")
        @PutMapping(path="update/{email}")
        public ResponseEntity<ResponseDto> updateVenue(@RequestBody UserDto userDto, @PathVariable("email") String email){
            Integer userC1 =userCService.updateClient(userDto,email);
            if(userC1!=null){
                return new ResponseEntity<>
                        (successResponse("data Updated.",userDto), HttpStatus.CREATED);
            }
            else{
                return new ResponseEntity<>
                        (errorResponse("Update failed.",null),HttpStatus.BAD_REQUEST);
            }
        }

        @GetMapping("booking/{email}")
        public ResponseEntity<ResponseDto>getBooking(@PathVariable("email") String email){
            List<Booking> booking =userCService.getBooking(email);
            if(booking !=null) {
                return new ResponseEntity<>
                        (successResponse("Requested Booking List  Fetched.", booking), HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>
                        (errorResponse("Requests Fetching Failed", null), HttpStatus.BAD_REQUEST);
            }
        }

        @GetMapping(path="venue/{email}")
        public ResponseEntity<ResponseDto>findVenueByEmail(@PathVariable String email){
            VenueDto venue =venueService.findVenueByEmail(email);
            if(venue != null ){
                return new ResponseEntity<>
                        (successResponse("Venue   Fetched.", venue), HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>
                        (errorResponse("Venue Fetched Failed", null), HttpStatus.BAD_REQUEST);
            }
        }

    @PostMapping(path="rateVenue/{vemail}/{uemail}")
    public ResponseEntity<Void> addRating(@PathVariable String vemail,String uemail,
                                          @RequestBody Rating rating) {
        Venue venue = venueRepo.getById(venueService.findVenueByEmail(vemail).getId());

        UserC user = userCService.findClientByEmail(uemail);

        ratingAndReviewService.addRating(venue, user,rating.getRating());
        return ResponseEntity.ok().build();
    }

    @GetMapping("getrating/{vemail}")
    public ResponseEntity<Double> getAverageRating(@PathVariable String vemail) {
        Venue venue = venueRepo.getById(venueService.findVenueByEmail(vemail).getId());

        Double averageRating = ratingAndReviewService.getAverageRating(venue);
        return ResponseEntity.ok(averageRating);
    }

    @CrossOrigin(origins = "*",methods = RequestMethod.PUT,maxAge = 86400,allowedHeaders = "*")
    @PutMapping(path="review/{vemail}/{uemail}")
    public ResponseEntity<ResponseDto> reviewVenue(@PathVariable("vemail") String vEmail,
                                                 @PathVariable("uemail") String uEmail,@RequestBody VenueRatingsAndReviews reviews) throws IOException {
        VenueRatingsAndReviews review = ratingAndReviewService
                .reviewOfVenue(
                        venueService.findVenueByEmail(vEmail).getId(),
                        userCService.findClientByEmail(uEmail).getId(),
                        reviews
                );
        if(review !=null){
            return new ResponseEntity<>
                    (successResponse("Review successful", review), HttpStatus.OK);
        }
        else
            return new ResponseEntity<>
                    (errorResponse("Review Denied",null),HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path="recommend/{email}")
    public ResponseEntity<ResponseDto> Recommender(@PathVariable("email") String email) {
        UserC user = userCService.findClientByEmail(email);
        if (user != null) {
            List<VenueDto> venues = getRecommendedVenues(user.getId());
            if (!venues.isEmpty()) {
                return new ResponseEntity<>(successResponse("Recommendation venue fetched.", venues), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(errorResponse("No recommendation available.", null), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(errorResponse("User not found.", null), HttpStatus.BAD_REQUEST);
        }
    }

    private List<VenueDto> getRecommendedVenues(Long userId) {
        List<Long> venueIdList = recommenderUtils.getVenueRecommendations(userId, 10);
        List<Venue> recommendedVenues = venueService.getVenuesByIds(venueIdList);
        return recommendedVenues.stream()
                .map(this::mapVenueToDto)
                .collect(Collectors.toList());
    }

    private VenueDto mapVenueToDto(Venue venue) {
        return VenueDto.builder()
                .id(venue.getId())
                .venueName(venue.getVenueName())
                .availableRooms(venue.getAvailableRooms())
                .capacity(venue.getCapacity())
                .city_name(venue.getCity_name())
                .description(venue.getDescription())
                .filePath(fileStorageUtils.getBase64FileFromFilePath(venue.getFile()))
                .email(venue.getEmail())
                .mobile_no(venue.getMobile_no())
                .userName(venue.getUserName())
                .availableServicesList(venue.getAvailableServicesList())
                .build();
    }



    @GetMapping(path="venueDetails/{email}")
    public ResponseEntity<ResponseDto>getDetailsOfVenue(@PathVariable("email") String email){
        VenueDto venue =venueService.getDetailsOfVenue(venueService.findVenueByEmail(email).getId());
        if(venue != null ){
            return new ResponseEntity<>
                    (successResponse("Details fetched.", venue), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Details fetched  Failed", null), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path="getPricing/{email}")
    public ResponseEntity<ResponseDto>getPricingOfVenue(@PathVariable("email") String email){
        List<PricingForBooking> venue =venueService.getAllPricing(venueService.findVenueByEmail(email).getId());
        if(venue != null ){
            return new ResponseEntity<>
                    (successResponse("Details fetched.", venue), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Details fetched  Failed", null), HttpStatus.BAD_REQUEST);
        }
    }

}
