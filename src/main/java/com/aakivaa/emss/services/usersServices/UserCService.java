package com.aakivaa.emss.services.usersServices;

import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.users.UserC;

import java.util.List;

public interface UserCService {

    UserC findById(Long id);
    UserC findByEmail(String email);
    List<UserC> findAll();
    List<Booking> getBooking(String email);
}
