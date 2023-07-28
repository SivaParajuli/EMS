package com.aakivaa.emss.controller;

import com.aakivaa.emss.dto.ResponseDto;
import com.aakivaa.emss.dto.StatusChangeReq;
import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.PricingForBooking;
import com.aakivaa.emss.services.BookingServices;
import com.aakivaa.emss.services.VenueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
@RequestMapping("venue-")
@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*" )

public class VenueController extends BaseController {

        private final VenueService venueService;
        private final BookingServices bookingServices;

        public VenueController(VenueService venueService, BookingServices bookingServices) {
            this.venueService = venueService;
            this.bookingServices = bookingServices;
        }

        @GetMapping(path="{email}")
        public ResponseEntity<ResponseDto> findVenueByEmail(@PathVariable String email){
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


        @CrossOrigin(origins = "*",methods = RequestMethod.PUT,maxAge = 86400,allowedHeaders = "*")
        @PutMapping(path="update/{email}")
        public ResponseEntity<ResponseDto> updateVenue(@RequestBody VenueDto venueDto,@PathVariable("email") String email){
            Integer venue =venueService.update(venueDto,email);
            if(venue!=null){
                return new ResponseEntity<>
                        (successResponse("data Updated.", venue), HttpStatus.CREATED);
            }
            else{
                return new ResponseEntity<>
                        (errorResponse("Update failed.",null),HttpStatus.BAD_REQUEST);
            }
        }


        @GetMapping("requests/{email}")
        public ResponseEntity<ResponseDto>getBookingRequests(@PathVariable("email") String email){
            List<Booking> booking =venueService.getRequestedBooking(email);
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
        public ResponseEntity<ResponseDto> BookingResponse(@RequestBody StatusChangeReq statusChangeReq,
                                                           @PathVariable("id")Long id){
            Integer bookingResponse = bookingServices.VenueBookingResponse(statusChangeReq.getStatus(),id);
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
            List<Booking> booking =venueService.getBookingList(email);
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
            Integer bookingRequest =venueService.getNumberOfBooking(email);
            return new ResponseEntity<>
                    (successResponse("Number of Booking Request", bookingRequest),HttpStatus.OK);
        }


    @CrossOrigin(origins = "*",methods = RequestMethod.PUT,maxAge = 86400,allowedHeaders = "*")
    @PutMapping(path="update/{vid}")
    public ResponseEntity<ResponseDto> updateVenueDetails(@RequestBody VenueDto venueDto,@PathVariable("vid") Long id){
        Integer venue =venueService.updateDetails(venueDto,id);
        if(venue!=null){
            return new ResponseEntity<>
                    (successResponse("Venue Details  Updated.", venue), HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Update failed.",null),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path="updatePricing/{id}")
    public ResponseEntity<ResponseDto> createVenue(@ModelAttribute PricingForBooking pricing,@PathVariable("id") Long id) {
       Integer integer = venueService.updatePricing(pricing,id);
        if(pricing !=null){
            return new ResponseEntity<>
                    (successResponse("PricingDetails updated",pricing), HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("pricing update failed",null),HttpStatus.BAD_REQUEST);
        }
    }

}

