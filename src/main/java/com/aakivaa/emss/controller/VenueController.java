package com.aakivaa.emss.controller;

import com.aakivaa.emss.dto.*;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.Pricing;
import com.aakivaa.emss.models.RatingsAndReviews;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.services.BookingServices;
import com.aakivaa.emss.services.RatingAndReviewService;
import com.aakivaa.emss.services.usersServices.VenueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequestMapping("venue-")
@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*" )

public class VenueController extends BaseController {

        private final VenueService venueService;
        private final BookingServices bookingServices;
        private final RatingAndReviewService ratingAndReviewService;

        public VenueController(VenueService venueService, BookingServices bookingServices, RatingAndReviewService ratingAndReviewService) {
            this.venueService = venueService;
            this.bookingServices = bookingServices;
            this.ratingAndReviewService = ratingAndReviewService;
        }

        @GetMapping(path="{email}")
        public ResponseEntity<ResponseDto> findVenueByEmail(@PathVariable String email){
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


        @GetMapping("requests/{email}")
        public ResponseEntity<ResponseDto>getBookingRequests(@PathVariable("email") String email){
            List<Booking> booking =bookingServices.getRequestedBooking(venueService.findByEmail(email).getId());
            if(booking !=null) {
                return new ResponseEntity<>
                        (successResponse("Requested Booking List  Fetched.", booking), HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>
                        (errorResponse("Requests Fetching Failed", null), HttpStatus.BAD_REQUEST);
            }
        }

        @CrossOrigin(origins = "*",methods = RequestMethod.PUT,maxAge = 86400,allowedHeaders = "*")
        @PutMapping("response/{id}")
        public ResponseEntity<ResponseDto> BookingResponse(@PathVariable("id")Long id,@RequestBody Request request){
            Integer bookingResponse = bookingServices.VenueBookingResponse(id, request.getStatus());
            if(bookingResponse != null){
                return new ResponseEntity<>
                        (successResponse("response sent",bookingResponse),HttpStatus.OK);
            }
            else{
                return  new ResponseEntity<>(
                        errorResponse("sending response unsuccessful",null),HttpStatus.BAD_REQUEST);
            }

        }

        @GetMapping("booking/{email}")
        public ResponseEntity<ResponseDto>getBooking(@PathVariable("email") String email){
            List<Booking> booking =bookingServices.getBookingList(venueService.findByEmail(email).getId());
            if(booking !=null) {
                return new ResponseEntity<>
                        (successResponse("Requested Booking List  Fetched.", booking), HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>
                        (errorResponse("Requests Fetching Failed", null), HttpStatus.BAD_REQUEST);
            }
        }


        @GetMapping("bookingRequest/{email}")
        public ResponseEntity<ResponseDto> getNumberOfBooking(@PathVariable("email")  String email){
            Integer bookingRequest =bookingServices.getNumberOfBooking(venueService.findByEmail(email).getId());
            return new ResponseEntity<>
                    (successResponse("Number of Booking Request", bookingRequest),HttpStatus.OK);
        }


    @CrossOrigin(origins = "*",methods = RequestMethod.PUT,maxAge = 86400,allowedHeaders = "*")
    @PutMapping(path="update/{email}")
    public ResponseEntity<ResponseDto> updateVenueDetails(@RequestBody EventAndServicesDto eventAndServicesDto, @PathVariable("email") String email){
        Integer integer =venueService.updateDetails(eventAndServicesDto,venueService.findByEmail(email).getId());
        if(integer !=null){
            return new ResponseEntity<>
                    (successResponse("Venue Details  Updated.", integer), HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Update failed.",null),HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin(origins = "*",methods = RequestMethod.PUT,maxAge = 86400,allowedHeaders = "*")
    @PutMapping(path="uploadimage/{email}",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ResponseDto> uploadImages( @PathVariable("email") String email,@ModelAttribute ImgDesDto imgDesDto){
        Integer integer =venueService.uploadImage(imgDesDto,venueService.findByEmail(email).getId());
        if(integer!=null){
            return new ResponseEntity<>
                    (successResponse("Image uploaded.", integer), HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("upload failed.",null),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path="updatePricing/{email}")
    public ResponseEntity<ResponseDto> createVenue(@RequestBody PricingDto pricingDto, @PathVariable("email") String email) {
       Pricing pricing = venueService.updatePricing(pricingDto,venueService.findByEmail(email).getId());
        if(pricing !=null){
            return new ResponseEntity<>
                    (successResponse("PricingDetails updated",pricing), HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("pricing update failed",null),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("reviews/{email}")
    public ResponseEntity<ResponseDto>getReviews(@PathVariable("email") String email){
        List<RatingsAndReviews> reviews = ratingAndReviewService.getRatingAndReviewsById(venueService.findByEmail(email).getId());
        if(reviews !=null) {
            return new ResponseEntity<>
                    (successResponse("Reviews of Venue..", reviews), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Some error occurred...", null), HttpStatus.BAD_REQUEST);
        }
    }




}

