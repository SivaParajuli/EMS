package com.aakivaa.emss.security.service;

import com.aakivaa.emss.dto.SignInRequest;
import com.aakivaa.emss.security.jwt.JwtProvider;
import com.aakivaa.emss.security.user.ApplicationUser;
import com.aakivaa.emss.security.user.User;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service

public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    public AuthenticationServiceImpl(AuthenticationManager authenticationManager, JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User signInAndReturnJWT(SignInRequest signInRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(),
                        signInRequest.getPassword())

        );
       ApplicationUser applicationUser = (ApplicationUser) authentication.getPrincipal();

        String jwt = jwtProvider.generateToken(applicationUser);

        User signInUser = applicationUser.getUser();
        signInUser.setToken(jwt);

        return signInUser;
    }
}
