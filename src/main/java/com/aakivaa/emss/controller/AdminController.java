package com.aakivaa.emss.controller;

import com.aakivaa.emss.dto.ResponseDto;
import com.aakivaa.emss.dto.StatusChangeReq;
import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.models.Admin;
import com.aakivaa.emss.models.UserC;
import com.aakivaa.emss.services.AdminService;
import com.aakivaa.emss.services.RegistrationServices;
import com.aakivaa.emss.services.UserCService;
import com.aakivaa.emss.services.VenueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("admin-")
public class AdminController extends BaseController {

    private final RegistrationServices registerService;
    private final AdminService adminService;
    private final VenueService venueService;
    private final UserCService clientService;


    public AdminController(RegistrationServices registerService, AdminService adminService, VenueService venueService, UserCService clientService) {
        this.registerService = registerService;
        this.adminService = adminService;
        this.venueService = venueService;
        this.clientService = clientService;
    }

    @GetMapping("registerRequests")
    public ResponseEntity<ResponseDto>getAllRegisterRequests(){
        List<VenueDto> venueList =registerService.getAllPendingRegister();
        if(venueList !=null) {
            return new ResponseEntity<>
                    (successResponse("Requested Booking List  Fetched.",venueList), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>
                    (errorResponse("Venue Fetched Failed", null), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path="{email}")
    public ResponseEntity<ResponseDto> findUser(@PathVariable String email){
        Admin currentUser = adminService.findAdminByEmail(email);
        if(currentUser !=null){
            return new ResponseEntity<>
                    (successResponse("CurrentUser", currentUser), HttpStatus.OK);
        }
        else
            return new ResponseEntity<>
                    (errorResponse("sorry",null),HttpStatus.BAD_REQUEST);
    }

    @CrossOrigin(origins = "*",methods = RequestMethod.PUT,maxAge = 86400,allowedHeaders = "*")
    @PutMapping("update/{id}")
    public ResponseEntity<ResponseDto>verifyVenue(@RequestBody StatusChangeReq statusChangeReq, @PathVariable("id") Integer id) {
        Integer venue = registerService.updateVenueStatus(statusChangeReq.getStatus(), id);
        if (venue != null) {
            return new ResponseEntity<>
                    (successResponse("Updating Successful.", venue), HttpStatus.OK);
        } else {
            return new ResponseEntity<>
                    (errorResponse("Updating venue verification status failed.", null), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("allVenue")
    public ResponseEntity<ResponseDto> getAllVerifiedVenue(){
        List<VenueDto> venueList =venueService.getAllVerifiedVenue();
        return new ResponseEntity<>
                (successResponse("Verified venue fetched", venueList),HttpStatus.OK);
    }

    @GetMapping("allClient")
    public ResponseEntity<ResponseDto> getAllClient(){
        List<UserC> clientList =clientService.findAll();
        return new ResponseEntity<>
                (successResponse("All Client fetched", clientList),HttpStatus.OK);
    }


    @GetMapping("newRegistration")
    public ResponseEntity<ResponseDto> getNumberOfNewRegistration(){
        Integer newRegistrationRequests =venueService.getNumberOfNewRegistration();
        return new ResponseEntity<>
                (successResponse("Number of new Registration Requests", newRegistrationRequests),HttpStatus.OK);
    }
}

