package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.enums.BookingStatus;
import com.aakivaa.emss.enums.VenueStatus;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.Venue;
import com.aakivaa.emss.repo.FunctionRepo;
import com.aakivaa.emss.repo.VenueRepo;
import com.aakivaa.emss.services.VenueService;
import com.aakivaa.emss.utils.FileStorageUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VenueServiceImpl implements VenueService {

    private final VenueRepo venueRepo;
    private final FunctionRepo functionRepo;
    private final FileStorageUtils fileStorageUtils;


    public VenueServiceImpl(VenueRepo venueRepo, FunctionRepo functionRepo, FileStorageUtils fileStorageUtils) {
        this.venueRepo = venueRepo;
        this.functionRepo = functionRepo;
        this.fileStorageUtils = fileStorageUtils;
    }

    @Override
    public List<VenueDto> findAll() {
        List<Venue> venueList = venueRepo.findAll();
        return venueList.stream().map(entity -> VenueDto.builder()
                .venueName(entity.getVenueName())
                .userName(entity.getUserName())
                .capacity(entity.getCapacity())
                .mobile_no(entity.getMobile_no())
                .email(entity.getEmail())
                .city_name(entity.getCity_name())
                .build()).collect(Collectors.toList());
    }

    @Override
    public VenueDto findVenueByEmail(String email) {
        Optional<Venue> venue = venueRepo.findVenueByEmail(email);
        if (venue.isPresent()) {
            Venue venue1 = venue.get();
            return VenueDto.builder()
                    .id(venue1.getId())
                    .userName(venue1.getUserName())
                    .description(venue1.getDescription())
                    .venueName(venue1.getVenueName())
                    .capacity(venue1.getCapacity())
                    .email(venue1.getEmail())
                    .mobile_no(venue1.getMobile_no())
                    .city_name(venue1.getCity_name())
                    .build();
        }
        return null;
    }

    @Override
    public VenueDto findById(Integer id) {
        Optional<Venue> venue = venueRepo.findById(id);
        if (venue.isPresent()) {
            Venue venue1 = venue.get();
            return VenueDto.builder()
                    .venueName(venue1.getVenueName())
                    .city_name(venue1.getCity_name())
                    .capacity(venue1.getCapacity())
                    .mobile_no(venue1.getMobile_no())
                    .email(venue1.getEmail())
                    .userName(venue1.getUserName())
                    .build();
        }
        return null;
    }

    @Override
    public void deleteBYId(Integer integer) {
        venueRepo.deleteById(integer);
    }

    @Override
    public Integer update(VenueDto venueDto, String email) {
        return null;
    }

    @Override
    public List<Booking> getRequestedBooking(String email) {
        List<Booking> requestList = venueRepo.getAllPendingBookingRequest(email, BookingStatus.PENDING);
        return requestList.stream().map(entity -> Booking.builder()
                .id(entity.getId())
                .bookingDate(entity.getBookingDate())
                .userC(entity.getUserC())
                .contactNumber(entity.getContactNumber())
                .eventType(entity.getEventType())
                .calculatedPayment(entity.getCalculatedPayment())
                .requiredCapacity(entity.getRequiredCapacity())
                .build()).collect(Collectors.toList());
    }



    public List<VenueDto> getAllVerifiedVenue() {
        List<Venue> venueList = venueRepo.findAllVerifiedVenue(VenueStatus.VERIFIED);
        return venueList.stream().map(entity -> VenueDto.builder()
                .id(entity.getId())
                .venueName(entity.getVenueName())
                .mobile_no(entity.getMobile_no())
                .email(entity.getEmail())
                .city_name(entity.getCity_name())
                .capacity(entity.getCapacity())
                .userName(entity.getUserName())
                .description(entity.getDescription())
                .build()).collect(Collectors.toList());
    }

    @Override
    public List<Booking> getBookingList(String email) {
        List<Booking> requestList = venueRepo.getAllBookingList(email);
        return requestList.stream().map(entity -> Booking.builder()
                .id(entity.getId())
                .bookingDate(entity.getBookingDate())
                .userC(entity.getUserC())
                .contactNumber(entity.getContactNumber())
                .bookingStatus(entity.getBookingStatus())
                .eventType(entity.getEventType())
                .calculatedPayment(entity.getCalculatedPayment())
                .requiredCapacity(entity.getRequiredCapacity())
                .build()).collect(Collectors.toList());
    }

    @Override
    public List<?> getAllBookedDate(String email) {
        List<?> dateList = venueRepo.getBookedVenueDateById(email, BookingStatus.CANCELED);
        return new ArrayList<>(dateList);
    }


    @Override
    public Integer getNumberOfNewRegistration() {
        Integer newRegistration = venueRepo.newRegistration(VenueStatus.UNVERIFIED);
        return newRegistration;
    }

    @Override
    public Integer getNumberOfBooking(String email) {
        Integer numberOfBooking = venueRepo.getNumberOfBooking(email , BookingStatus.PENDING);
        return numberOfBooking;
    }


}
