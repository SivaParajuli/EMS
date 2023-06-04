package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.dto.registrationDto.UserDto;
import com.aakivaa.emss.enums.ApplicationUserRole;
import com.aakivaa.emss.enums.VenueStatus;
import com.aakivaa.emss.models.UserC;
import com.aakivaa.emss.models.Venue;
import com.aakivaa.emss.repo.UserCRepo;
import com.aakivaa.emss.repo.VenueRepo;
import com.aakivaa.emss.services.RegistrationServices;
import com.aakivaa.emss.utils.EmailSenderService;
import com.aakivaa.emss.utils.FileStorageUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RegistrationServiceImpl implements RegistrationServices {
    private final VenueRepo venueRepo;
    private final UserCRepo userCRepo;
    private  final FileStorageUtils fileStorageUtils;
    private final EmailSenderService emailSenderService;

    public RegistrationServiceImpl( VenueRepo venueRepo, UserCRepo userCRepo, FileStorageUtils fileStorageUtils, EmailSenderService emailSenderService) {
        this.venueRepo = venueRepo;
        this.userCRepo = userCRepo;
        this.fileStorageUtils = fileStorageUtils;
        this.emailSenderService = emailSenderService;
    }

    @Override
    public UserDto userRegistration(UserDto userDto) {
        UserC entity= UserC.builder()
                .name(userDto.getUsername())
                .mobile_no(userDto.getMobile_no())
                .email(userDto.getEmail())
                .city_name(userDto.getCity_name())
                .street_name(userDto.getStreet_name())
                .password(userDto.getPassword())
                .build();
        entity= userCRepo.save(entity);
        return UserDto.builder()
                .id(entity.getId())
                .username(entity.getName())
                .mobile_no(entity.getMobile_no())
                .email(entity.getEmail())
                .city_name(entity.getCity_name())
                .street_name(entity.getStreet_name())
                .build();
    }

    @Override
    public VenueDto venueRegistration(VenueDto venueDto) throws IOException {
        String file = fileStorageUtils.storeFile(venueDto.getVenueFile());
        Venue entity = Venue.builder()
                .id(venueDto.getId())
                .venueName(venueDto.getVenueName())
                .password((venueDto.getPassword()))
                .contactNumber(venueDto.getContactNumber())
                .email(venueDto.getEmail())
                .address(venueDto.getAddress())
                .description(venueDto.getDescription())
                .userName(venueDto.getUserName())
                .capacity(venueDto.getCapacity())
                .applicationUserRole(ApplicationUserRole.VENUE)
                .venueStatus(VenueStatus.UNVERIFIED)
                .image(file)
                .build();
        entity = venueRepo.save(entity);
        return VenueDto.builder()
                .id(entity.getId())
                .venueName(entity.getVenueName())
                .email(entity.getEmail())
                .userName(entity.getUserName())
                .filePath(entity.getImage())
                .capacity(entity.getCapacity())
                .build();
    }


    public List<VenueDto> getAllPendingRegister() {
        List<Venue> venueList= venueRepo.findPendingRegister(VenueStatus.UNVERIFIED);
        return venueList.stream().map(entity -> VenueDto.builder()
                .id(entity.getId())
                .venueName(entity.getVenueName())
                .contactNumber(entity.getContactNumber())
                .email(entity.getEmail())
                .address(entity.getAddress())
                .userName(entity.getUserName())
                .capacity(entity.getCapacity())
                .filePath(entity.getImage())
                .description(entity.getDescription())
                .build()).collect(Collectors.toList());
    }

    @Override
    public Integer updateVenueStatus(Integer status, Integer id) {
        Optional<Venue> venue = venueRepo.findById(id);
        if (status == 0) {
            if (venue.isPresent()) {
                Venue venue1 = venue.get();
                UserC user = new UserC();
                user.setEmail(venue1.getEmail());
                user.setUName(venue1.getUserName());
                user.setPassword(venue1.getPassword());
                user.setApplicationUserRole(venue1.getApplicationUserRole());
                userCRepo.save(user);
                emailSenderService.sendEmail(venue1.getEmail(),
                        "Registration Response",
                        "Your Registration is Successful login with your credentials.");
                return venueRepo.updateVenueStatus(VenueStatus.VERIFIED, id);
            }
        }
        if(status == 1 ) {
            if (venue.isPresent()) {
                Venue venue1 = venue.get();
                emailSenderService.sendEmail(venue1.getEmail(),
                        "Registration Response",
                        "Your Registration is UnSuccessful Register again with valid information");
                return venueRepo.updateVenueStatus(VenueStatus.UNVERIFIED, id);
            }
        }
        return null;
    }

}
