package com.aakivaa.emss.controller;
import com.aakivaa.emss.dto.*;
import com.aakivaa.emss.models.*;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.services.BookingServices;
import com.aakivaa.emss.services.EventService;
import com.aakivaa.emss.services.RatingAndReviewService;
import com.aakivaa.emss.services.usersServices.UserCService;
import com.aakivaa.emss.services.usersServices.VenueService;
import com.aakivaa.emss.utils.EmailSenderService;
import org.apache.mahout.cf.taste.common.TasteException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path="client-")

public class UserCController extends BaseController{


        private final BookingServices bookingServices;
        private final VenueService venueService;
        private final UserCService userCService;
        private final EmailSenderService emailSenderService;
        private final RatingAndReviewService ratingAndReviewService;
        private final EventService eventService;


    public UserCController(BookingServices bookingServices, VenueService venueService, UserCService userCService, EmailSenderService emailSenderService, RatingAndReviewService ratingAndReviewService, EventService eventService) {
        this.bookingServices = bookingServices;
        this.venueService = venueService;
        this.userCService = userCService;
        this.emailSenderService = emailSenderService;
        this.ratingAndReviewService = ratingAndReviewService;
        this.eventService = eventService;
    }

    @GetMapping("clientHome")
    public ResponseEntity<List<VenueDto>> getAllVerifiedVenues() {
        List<VenueDto> verifiedVenues = venueService.getAllVerifiedVenue();
        return ResponseEntity.ok(verifiedVenues);
    }

        @GetMapping(path="{email}")
        public ResponseEntity<ResponseDto> findUser(@PathVariable String email){
            UserC currentUser =userCService.findByEmail(email);
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
            Booking booking1 = bookingServices.VenueBookingRequest(bookingDto,venueService.findByEmail(vEmail).getId(),
                    userCService.findByEmail(email).getId());
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
            List<LocalDate> dateList =bookingServices.getAllBookedDate(venueService.findByEmail(email).getId());
            return new ResponseEntity<>
                    (successResponse("Data List fetched.", dateList),HttpStatus.OK);
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
            Venue venue =venueService.findByEmail(email);
            if(venue != null ){
                return new ResponseEntity<>
                        (successResponse("Venue   Fetched.", venue), HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>
                        (errorResponse("Venue Fetched Failed", null), HttpStatus.BAD_REQUEST);
            }
        }

    @CrossOrigin(origins = "*",methods = RequestMethod.PUT,maxAge = 86400,allowedHeaders = "*")
    @PutMapping(path="rateVenue/{uemail}/{vemail}")
    public ResponseEntity<ResponseDto> addRating(@PathVariable ("uemail")String uemail,@PathVariable ("vemail")String vemail,
                                          @RequestBody RatingsAndReviews rating) {
        RatingsAndReviews rating1 = ratingAndReviewService.addRating(userCService.findByEmail(uemail),
                venueService.findByEmail(vemail)
                ,rating);
        if(rating1 != null ){
            return new ResponseEntity<>
                    (successResponse("Rating successful.", rating1), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Rating denied", null), HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("getrating/{vemail}")
    public ResponseEntity<ResponseDto> getAverageRating(@PathVariable("vemail") String vemail) {
        Venue venue = venueService.findById(venueService.findByEmail(vemail).getId());
        Double averageRating = ratingAndReviewService.getAverageRating(venue);
        if(averageRating != null ){
            return new ResponseEntity<>
                    (successResponse("Rating of Venue Fetched.", averageRating), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Fetching Failed", null), HttpStatus.BAD_REQUEST);
        }
    }



    @GetMapping(path="recommend/{email}")
    public ResponseEntity<ResponseDto> Recommender(@PathVariable("email") String email) {
        UserC user = userCService.findByEmail(email);
            if (user != null) {
                List<VenueDto> venues = venueService.getRecommendations(user.getId());
                if (!venues.isEmpty()) {
                    return new ResponseEntity<>(successResponse("Recommendation venue fetched.", venues), HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(errorResponse("No recommendation available.", null), HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<>(errorResponse("User not found.", null), HttpStatus.BAD_REQUEST);
            }
    }


        @GetMapping(path="venueDetails/{email}")
    public ResponseEntity<ResponseDto>getDetailsOfVenue(@PathVariable("email") String email){
        VenueDto venue =venueService.getDetailsOfVenue(venueService.findByEmail(email).getId());
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
        List<Pricing> venue =venueService.getAllPricing(venueService.findByEmail(email).getId());
        if(venue != null ){
            return new ResponseEntity<>
                    (successResponse("Details fetched.", venue), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Details fetched  Failed", null), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path="getResponse/{email}")
    public ResponseEntity<ResponseDto>getBookingResponse(@PathVariable("email") String email,@PathVariable("vemail") String vemail){
        List<Booking> response =bookingServices.getBookingResponses(email,vemail);
        if(response != null ){
            return new ResponseEntity<>
                    (successResponse("Response fetched.", response), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Responding  Failed", null), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("getDates/{uemail}/{vemail}")
    public ResponseEntity<ResponseDto>getReviews(@PathVariable("uemail") String uemail,@PathVariable("vemail") String vemail){
        List<LocalDate> dateList = bookingServices.getDateByIds(userCService.findByEmail(uemail).getId(),
                venueService.findByEmail(vemail).getId());
        if(dateList !=null) {
            return new ResponseEntity<>
                    (successResponse("Dates..", dateList), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Some error occurred...", null), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path="eventUpdate/{uemail}/")
    public ResponseEntity<ResponseDto> addEvent(@PathVariable ("uemail")String uemail,
                                                 @RequestBody Event evt) {
        Event event1 = eventService.addEvent(userCService.findByEmail(uemail),evt);
        if(event1 != null ){
            return new ResponseEntity<>
                    (successResponse("Events uploaded..", event1), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Failed to upload", null), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("getEvents")
    public ResponseEntity<ResponseDto>getEvents(){
        List<Event> eventList = eventService.getEvents();
        if(eventList !=null) {
            return new ResponseEntity<>
                    (successResponse("Available events  ", eventList), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Failed to retrieve", null), HttpStatus.BAD_REQUEST);
        }
    }

}
