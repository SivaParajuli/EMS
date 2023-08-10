package com.aakivaa.emss.utils.security.service;

import com.aakivaa.emss.dto.SignInRequest;
import com.aakivaa.emss.utils.security.user.User;


public interface AuthenticationService {
   User signInAndReturnJWT(SignInRequest signInRequest);
}
