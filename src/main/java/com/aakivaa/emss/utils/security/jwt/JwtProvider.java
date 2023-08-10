package com.aakivaa.emss.utils.security.jwt;

import com.aakivaa.emss.utils.security.user.ApplicationUser;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;


public interface JwtProvider {
    String generateToken(ApplicationUser auth);

    Authentication getAuthentication(HttpServletRequest request);

    boolean isTokenValid(HttpServletRequest request);

}
