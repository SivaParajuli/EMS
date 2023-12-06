package com.aakivaa.emss.services.impl.usersImpl;

import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.repo.usersRepo.UserCRepo;
import com.aakivaa.emss.services.usersServices.UserCService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserCImpl implements UserCService {
    private final UserCRepo userCRepo;

    public UserCImpl(UserCRepo userCRepo) {
        this.userCRepo = userCRepo;
    }

    @Override
    public UserC findById(Long id) {
       return userCRepo.getById(id);
    }
    public UserC findByEmail(String email) {
        return userCRepo.getByEmail(email);
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
                .status(entity.getStatus())
                .eventType(entity.getEventType())
                .requiredCapacity(entity.getRequiredCapacity())
                .build()).collect(Collectors.toList());
    }


}
