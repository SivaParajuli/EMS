package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.dto.BookingDto;
import com.aakivaa.emss.dto.EventsCostCalculation;
import com.aakivaa.emss.enums.BookingStatus;
import com.aakivaa.emss.enums.EventType;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.repo.BookingRepo;
import com.aakivaa.emss.repo.UserCRepo;
import com.aakivaa.emss.repo.VenueRepo;
import com.aakivaa.emss.services.BookingServices;
import com.aakivaa.emss.utils.BookingUtils;
import com.aakivaa.emss.utils.EmailSenderService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;
@Service
public class BookingServicesImpl implements BookingServices {


    private final BookingRepo bookingRepo;
    private final VenueRepo venueRepo;
    private final UserCRepo userCRepo;
    private final EmailSenderService emailSenderService;
    private final BookingUtils bookingUtils;


    public BookingServicesImpl(BookingRepo bookingRepo, VenueRepo venueRepo, UserCRepo userCRepo, EmailSenderService emailSenderService, BookingUtils bookingUtils) {
        this.bookingRepo = bookingRepo;
        this.venueRepo = venueRepo;
        this.userCRepo = userCRepo;
        this.emailSenderService = emailSenderService;
        this.bookingUtils = bookingUtils;
    }

    @Override
    public Booking VenueBookingRequest(BookingDto bookingDto, String vEmail, String email ) throws IOException {
        UserC userC1 = userCRepo.findClientByEmail(email).orElseThrow(()->new RuntimeException("clientNotFound"));
        Venue venue1 = venueRepo.findVenueByEmail(vEmail).orElseThrow(()->new RuntimeException("venueNotFound"));
        if(Integer.parseInt(bookingDto.getRequiredCapacity()) > Integer.parseInt(venue1.getCapacity())){
            throw new IOException("invalid requirement");
        }
        EventType eventType = bookingUtils.getEvent(bookingDto.getFunctionType());
        EventsCostCalculation rateAndCost = venueRepo.getRateCost(vEmail);
        Integer cPayment = Integer.parseInt(bookingDto.getRequiredCapacity());
        Booking entity = Booking.builder()
                .bookingDate(bookingDto.getBookingDate())
                .eventType(eventType)
                .calculatedPayment(bookingUtils.calculatePayment(rateAndCost.getRate(), bookingUtils.getCost(bookingDto.getFunctionType(),vEmail),cPayment))
                .bookingStatus(BookingStatus.PENDING)
                .requiredCapacity(bookingDto.getRequiredCapacity())
                .contactNumber(bookingDto.getContactNumber())
                .userC(userC1)
                .venue(venue1).build();
        entity = bookingRepo.save(entity);
        return Booking.builder()
                .venue(entity.getVenue())
                .bookingDate(entity.getBookingDate())
                .eventType(entity.getEventType())
                .bookingStatus(entity.getBookingStatus())
                .contactNumber(entity.getContactNumber())
                .build();

    }

    @Override
    public Integer VenueBookingResponse(Integer bookingStatus, Long id) {
        if (bookingStatus == 1) {
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
        if (bookingStatus == 2) {
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
                    .contactNumber(booking.getContactNumber())
                    .build();
        }
        return null;
    }

}
