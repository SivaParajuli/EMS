package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.dto.BookingDto;
import com.aakivaa.emss.enums.BookingStatus;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.functionsAndServices.RecipeMenu;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.repo.BookingRepo;
import com.aakivaa.emss.repo.RecipeMenuRepo;
import com.aakivaa.emss.repo.UserCRepo;
import com.aakivaa.emss.repo.VenueRepo;
import com.aakivaa.emss.services.BookingServices;
import com.aakivaa.emss.utils.BookingUtils;
import com.aakivaa.emss.utils.EmailSenderService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;
@Service
public class BookingServicesImpl implements BookingServices {


    private final BookingRepo bookingRepo;
    private final VenueRepo venueRepo;
    private final UserCRepo userCRepo;
    private final EmailSenderService emailSenderService;
    private final RecipeMenuRepo recipeMenuRepo;


    public BookingServicesImpl(BookingRepo bookingRepo, VenueRepo venueRepo, UserCRepo userCRepo, EmailSenderService emailSenderService, RecipeMenuRepo recipeMenuRepo) {
        this.bookingRepo = bookingRepo;
        this.venueRepo = venueRepo;
        this.userCRepo = userCRepo;
        this.emailSenderService = emailSenderService;
        this.recipeMenuRepo = recipeMenuRepo;
    }

    @Override
    public Booking VenueBookingRequest(BookingDto bookingDto, Long vid, Long id ) throws IOException {
        UserC userC1 = userCRepo.getById(id);
        Venue venue1 = venueRepo.getById(vid);
        if(Integer.parseInt(bookingDto.getRequiredCapacity()) > Integer.parseInt(venue1.getCapacity())){
            throw new IOException("invalid requirement");
        }
        Booking entity = Booking.builder()
                .bookingDate(bookingDto.getBookingDate())
                .bookingStatus(BookingStatus.PENDING)
                .requiredCapacity(bookingDto.getRequiredCapacity())
                .userC(userC1)
                .venue(venue1)
                .preference(bookingDto.getPreference())
                .eventType(bookingDto.getFunctionType())
                .build();
        entity = bookingRepo.save(entity);
        Booking finalEntity = entity;
        Arrays.stream(bookingDto.getCategory()).forEach(recipeMenu -> {
            RecipeMenu recipeMenu1 = RecipeMenu.builder()
                    .name(recipeMenu)
                    .booking(bookingRepo.getById(finalEntity.getId()))
                    .venue(venue1)
                    .build();
            recipeMenuRepo.save(recipeMenu1);
        });

        return Booking.builder()
                .venue(entity.getVenue())
                .bookingDate(entity.getBookingDate())
                .eventType(entity.getEventType())
                .bookingStatus(entity.getBookingStatus())
                .build();

    }

    @Override
    public Integer VenueBookingResponse(Long id ,Integer integer) {
        if (integer == 1) {
            Optional<Booking> booking = bookingRepo.findById(id);
            if (booking.isPresent()) {
                Booking booking1 = booking.get();
                emailSenderService.sendEmail(booking1.getUserC().getEmail(),
                        "Booking Response",
                        "Mr/Miss " + booking1.getUserC().getName() +" Your Booking is Successful for "+booking1.getBookingDate()
                );
                return bookingRepo.updateBookingStatus(BookingStatus.ACCEPTED, id);
            }
        }
        if (integer == 2) {
            Optional<Booking> booking = bookingRepo.findById(id);
            if (booking.isPresent()) {
                Booking booking1 = booking.get();
                emailSenderService.sendEmail(booking1.getUserC().getEmail(),
                        "Booking Response",
                        "Mr/Miss " + booking1.getUserC().getName() + " Your Booking Request is Denied.please with another."
                );
                return bookingRepo.updateBookingStatus(BookingStatus.CANCELED, id);
            }
        }
        return null;
    }

    @Override
    public Booking findById(Long id) {
        Optional<Booking> optionalBooking =bookingRepo.findById(id);
        if(optionalBooking.isPresent()){
            Booking booking = optionalBooking.get();
            return Booking.builder()
                    .userC(booking.getUserC())
                    .venue(booking.getVenue())
                    .build();
        }
        return null;
    }

}