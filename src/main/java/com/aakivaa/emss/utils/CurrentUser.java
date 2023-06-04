package com.aakivaa.emss.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.security.Principal;

public class CurrentUser {
  @Bean
    public String CurrentUserName(Principal principal){
        return principal.getName();
    }
}
