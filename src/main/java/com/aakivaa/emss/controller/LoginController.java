package com.aakivaa.emss.controller;

import com.aakivaa.emss.dto.SignInRequest;
import com.aakivaa.emss.security.service.AuthenticationService;
import com.aakivaa.emss.security.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path="login")
public class LoginController extends BaseController{

    private final AuthenticationService authenticationService;

    public LoginController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }


    @PostMapping
    public ResponseEntity<?> login(@RequestBody SignInRequest signInRequest){
        User signInRequest1 = authenticationService.signInAndReturnJWT(signInRequest);
        if(signInRequest1 != null){
            return new ResponseEntity<>
                    (successResponse("Login Successful",signInRequest1), HttpStatus.OK);
        }
        return new ResponseEntity<>
                (errorResponse("login failed",signInRequest),HttpStatus.BAD_REQUEST);
    }
}