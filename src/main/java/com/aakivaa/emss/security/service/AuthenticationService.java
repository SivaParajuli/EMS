package com.aakivaa.emss.security.service;

import com.aakivaa.emss.dto.SignInRequest;
import com.aakivaa.emss.security.user.User;


public interface AuthenticationService {
   User signInAndReturnJWT(SignInRequest signInRequest);
}
