package com.aakivaa.emss.services;


import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.dto.UserDto;
import com.aakivaa.emss.models.users.Admin;

import java.io.IOException;
import java.util.List;

public interface RegistrationServices {
    UserDto userRegistration(UserDto userDto);
    VenueDto venueRegistration(VenueDto venueDto) throws IOException;
    List<VenueDto> getAllPendingRegister();
    Integer updateVenueStatus(Integer status, Long id);

    Admin registerAdmin(Admin admin);
}
