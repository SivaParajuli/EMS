package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.dto.BookingDto;
import com.aakivaa.emss.enums.Status;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.repo.BookingRepo;
import com.aakivaa.emss.repo.usersRepo.UserCRepo;
import com.aakivaa.emss.repo.usersRepo.VenueRepo;
import com.aakivaa.emss.services.BookingServices;
import com.aakivaa.emss.utils.EmailSenderService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingImpl implements BookingServices {


    private final BookingRepo bookingRepo;
    private final VenueRepo venueRepo;
    private final UserCRepo userCRepo;
    private final EmailSenderService emailSenderService;


    public BookingImpl(BookingRepo bookingRepo, VenueRepo venueRepo, UserCRepo userCRepo, EmailSenderService emailSenderService) {
        this.bookingRepo = bookingRepo;
        this.venueRepo = venueRepo;
        this.userCRepo = userCRepo;
        this.emailSenderService = emailSenderService;
    }

    @Override
    public Booking VenueBookingRequest(BookingDto bookingDto, Long vid, Long id ) throws IOException {
        UserC userC1 = userCRepo.getById(id);
        Venue venue1 = venueRepo.getById(vid);

        if((Integer.parseInt(bookingDto.getRequiredCapacity().substring(bookingDto.getRequiredCapacity().indexOf("-")+1)) >
                Integer.parseInt(venue1.getCapacity().substring(0,venue1.getCapacity().indexOf("-"))))) {
            throw new IOException("...invalid requirement.Required capacity is unavailable... ");
        }

//        if((Integer.parseInt(bookingDto.getRequiredCapacity().substring(0,bookingDto.getRequiredCapacity().indexOf("-"))) >
//                Integer.parseInt(venue1.getCapacity().substring(venue1.getCapacity().indexOf("-")+1)))){
//            throw new IOException("...invalid requirement.Required capacity is unavailable... ");
//        }
        Booking entity = Booking.builder()
                .bookingDate(bookingDto.getBookingDate())
                .status(Status.PENDING)
                .requiredCapacity(bookingDto.getRequiredCapacity())
                .recipeMenu(bookingDto.getRecipeList())
                .items(bookingDto.getItems())
                .userC(userC1)
                .venue(venue1)
                .preference(bookingDto.getPreference())
                .eventType(bookingDto.getFunctionType())
                .build();
         entity = bookingRepo.save(entity);
         return Booking.builder()
                 .status(entity.getStatus())
                 .bookingDate(entity.getBookingDate())
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
                        "Mr/Miss " + booking1.getUserC().getName() +",\n Your Booking is Successful. \n Date: "+booking1.getBookingDate()
                        +"\n Authorized By : " + booking1.getVenue().getUserName()
                );
                return bookingRepo.updateBookingStatus(Status.VERIFIED, id);
            }
        }
        if (integer == 2) {
            Optional<Booking> booking = bookingRepo.findById(id);
            if (booking.isPresent()) {
                Booking booking1 = booking.get();
                emailSenderService.sendEmail(booking1.getUserC().getEmail(),
                        "Booking Response",
                        "Mr/Miss " + booking1.getUserC().getName() + " Your Booking Request is Denied...\n Authorized By : "
                        + booking1.getVenue().getUserName()
                );
                return bookingRepo.updateBookingStatus(Status.DELETED, id);
            }
        }
        return null;
    }
    @Override
    public List<Booking> getRequestedBooking(Long id) {
        List<Booking> requestList = bookingRepo.getPendingRequests(id, Status.PENDING);
        return requestList.stream().map(entity -> Booking.builder()
                .id(entity.getId())
                .bookingDate(entity.getBookingDate())
                .userC(entity.getUserC())
                .eventType(entity.getEventType())
                .requiredCapacity(entity.getRequiredCapacity())
                .recipeMenu(entity.getRecipeMenu())
                .items(entity.getItems())
                .status(entity.getStatus())
                .preference(entity.getPreference())
                .build()).collect(Collectors.toList());
    }

    @Override
    public List<Booking> getBookingList(Long id) {
        List<Booking> requestList = bookingRepo.getAllBookingList(id);
        return requestList.stream().map(entity -> Booking.builder()
                .id(entity.getId())
                .bookingDate(entity.getBookingDate())
                .userC(entity.getUserC())
                .status(entity.getStatus())
                .items(entity.getItems())
                .recipeMenu(entity.getRecipeMenu())
                .eventType(entity.getEventType())
                .requiredCapacity(entity.getRequiredCapacity())
                .build()).collect(Collectors.toList());
    }

    @Override
    public List<Booking> getBookingResponses(String email,String vEmail) {
        List<Booking> requestList= bookingRepo.getBookingResponse(userCRepo.getByEmail(email).getId(),venueRepo.getByEmail(vEmail).getId(),Status.PENDING);
        return requestList.stream().map(entity-> Booking.builder()
                .bookingDate(entity.getBookingDate())
                .status(entity.getStatus())
                .eventType(entity.getEventType())
                .requiredCapacity(entity.getRequiredCapacity())
                .build()).collect(Collectors.toList());
    }

    @Override
    public List<LocalDate> getAllBookedDate(Long id) {
        List<LocalDate> dateList = bookingRepo.getBookedDateById(id, Status.VERIFIED);
        return new ArrayList<>(dateList);
    }
    @Override
    public Integer getNumberOfBooking(Long id) {
        return bookingRepo.getNumberOfBooking(id , Status.PENDING);
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

    @Override
    public List<LocalDate> getDateByIds(Long vid, Long uid) {
        List<LocalDate> dateList = bookingRepo.getDatesByIds(vid,uid, Status.VERIFIED);
        return new ArrayList<>(dateList);
    }

}
