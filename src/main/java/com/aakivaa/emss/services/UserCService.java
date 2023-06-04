package com.aakivaa.emss.services;

import com.aakivaa.emss.dto.registrationDto.UserDto;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.UserC;

import java.util.List;

public interface UserCService {

    UserC findClientByEmail(String email);
    List<UserC> findAll();
    List<Booking> getBooking(String email);
    Integer updateClient(UserDto userDto, String email);
}
