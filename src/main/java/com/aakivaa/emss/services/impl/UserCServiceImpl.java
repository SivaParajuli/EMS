package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.dto.registrationDto.UserDto;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.UserC;
import com.aakivaa.emss.repo.UserCRepo;
import com.aakivaa.emss.services.UserCService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserCServiceImpl implements UserCService {
    private final UserCRepo userCRepo;

    public UserCServiceImpl(UserCRepo userCRepo) {
        this.userCRepo = userCRepo;
    }

    @Override
    public UserC findClientByEmail(String email) {
        Optional<UserC> clientOptional= userCRepo.findClientByEmail(email);
        if(clientOptional.isPresent()){
            UserC entity=clientOptional.get();
            return UserC.builder()
                    .id(entity.getId())
                    .name(entity.getName())
                    .email(entity.getEmail())
                    .city_name(entity.getCity_name())
                    .street_name(entity.getStreet_name())
                    .mobile_no(entity.getMobile_no())
                    .build();
        }
        return null;
    }

    @Override
    public List<UserC> findAll() {
        List<UserC> clientList = userCRepo.findAll();
        return clientList.stream().map(entity-> UserC.builder()
                .name(entity.getName())
                .mobile_no(entity.getMobile_no())
                .email(entity.getEmail())
                .bookingList(entity.getBookingList())
                .street_name(entity.getStreet_name())
                .build()).collect(Collectors.toList());
    }

    @Override
    public List<Booking> getBooking(String email) {
        List<Booking> requestList= userCRepo.getAllBookingRequests(email);
        return requestList.stream().map(entity-> Booking.builder()
                .id(entity.getId())
                .bookingDate(entity.getBookingDate())
                .venue(entity.getVenue())
                .contactNumber(entity.getContactNumber())
                .bookingStatus(entity.getBookingStatus())
                .eventType(entity.getEventType())
                .calculatedPayment(entity.getCalculatedPayment())
                .requiredCapacity(entity.getRequiredCapacity())
                .build()).collect(Collectors.toList());
    }

    @Override
    public Integer updateClient(UserDto userDto, String email) {
        return null;
    }

}
