package com.aakivaa.emss.controller;

import com.aakivaa.emss.dto.ResponseDto;
import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.dto.UserDto;
import com.aakivaa.emss.models.users.Admin;
import com.aakivaa.emss.services.RegistrationServices;
import com.aakivaa.emss.utils.EmailSenderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path="register")
public class RegistrationController extends BaseController{

    private final RegistrationServices registrationServices;
    private final EmailSenderService emailSenderService;

    public RegistrationController(RegistrationServices registrationServices, EmailSenderService emailSenderService) {
        this.registrationServices = registrationServices;
        this.emailSenderService = emailSenderService;
    }


    @PostMapping(path="user")
    public ResponseEntity<ResponseDto> createClient(@RequestBody UserDto userDto) {
        userDto =registrationServices.userRegistration(userDto);
        if(userDto !=null){
            return new ResponseEntity<>
                    (successResponse("Client Created.", userDto), HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Client Creation Failed",null),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path="venue",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ResponseDto> createVenue(@ModelAttribute VenueDto venueDto) throws IOException {
       venueDto = registrationServices.venueRegistration(venueDto);
        if(venueDto !=null){
//            emailSenderService.sendEmail("svenuebooking.spad@gmail.com",
//                    "Registration Request",
//                    venueDto.getVenueName() +" wants to be registered with requirements in EMS.");

            return new ResponseEntity<>
                    (successResponse("Registration Request Sent Successfully.",venueDto), HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Venue Creation Failed",null),HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping(path="admin")
    public ResponseEntity<ResponseDto> registerAdmin(@RequestBody Admin admin) {
        admin =registrationServices.registerAdmin(admin);
        if(admin !=null){
            return new ResponseEntity<>
                    (successResponse("Client Created.", admin), HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Client Creation Failed",null),HttpStatus.BAD_REQUEST);
        }
    }

}
