package com.aakivaa.emss.controller;
import com.aakivaa.emss.dto.BookingDto;
import com.aakivaa.emss.dto.ResponseDto;
import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.dto.UserDto;
import com.aakivaa.emss.models.*;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.services.BookingServices;
import com.aakivaa.emss.services.RatingAndReviewService;
import com.aakivaa.emss.services.UserCService;
import com.aakivaa.emss.services.VenueService;
import com.aakivaa.emss.utils.EmailSenderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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


    public UserCController(BookingServices bookingServices, VenueService venueService, UserCService userCService, EmailSenderService emailSenderService, RatingAndReviewService ratingAndReviewService) {
        this.bookingServices = bookingServices;
        this.venueService = venueService;
        this.userCService = userCService;
        this.emailSenderService = emailSenderService;
        this.ratingAndReviewService = ratingAndReviewService;
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
            Booking booking1 = bookingServices.VenueBookingRequest(bookingDto,vEmail,email);
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


    @PostMapping(path="rateVenue/{rating}/{vid}/{id}")
    public ResponseEntity<ResponseDto> RateVenue(@PathVariable("rating") int rating , @PathVariable("vid") Long vid,
                                                   @PathVariable("id") Long id) throws IOException {
        VenueRatingsAndReviews venueRatingsAndReviews = ratingAndReviewService.rateVenue(rating,vid,id);
        if(venueRatingsAndReviews !=null){
            return new ResponseEntity<>
                    (successResponse("Rating successful", venueRatingsAndReviews), HttpStatus.OK);
        }
        else
            return new ResponseEntity<>
                    (errorResponse("Rating Denied",null),HttpStatus.BAD_REQUEST);
    }

    @PostMapping(path="review/{vid}/{id}")
    public ResponseEntity<ResponseDto> RateVenue(@PathVariable("vid") Long vid,
                                                 @PathVariable("id") Long id,@RequestBody VenueRatingsAndReviews reviews) throws IOException {
        VenueRatingsAndReviews review = ratingAndReviewService.reviewOfVenue(vid,id,reviews);
        if(review !=null){
            return new ResponseEntity<>
                    (successResponse("Review successful", review), HttpStatus.OK);
        }
        else
            return new ResponseEntity<>
                    (errorResponse("Review Denied",null),HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path="recommend/{email}")
    public ResponseEntity<ResponseDto>Recommender(@PathVariable String email){
        List<Venue> venue =venueService.getRecommendation(email);
        if(venue != null ){
            return new ResponseEntity<>
                    (successResponse("Recommendation venue fetched.", venue), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Recommendation Failed", null), HttpStatus.BAD_REQUEST);
        }
    }

}
