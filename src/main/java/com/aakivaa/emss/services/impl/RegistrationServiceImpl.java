package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.dto.UserDto;
import com.aakivaa.emss.enums.ApplicationUserRole;
import com.aakivaa.emss.enums.VenueStatus;
import com.aakivaa.emss.models.Admin;
import com.aakivaa.emss.models.UserC;
import com.aakivaa.emss.models.Venue;
import com.aakivaa.emss.repo.AdminRepo;
import com.aakivaa.emss.repo.UserCRepo;
import com.aakivaa.emss.repo.VenueRepo;
import com.aakivaa.emss.security.user.User;
import com.aakivaa.emss.security.user.UserRepo;
import com.aakivaa.emss.services.RegistrationServices;
import com.aakivaa.emss.utils.EmailSenderService;
import com.aakivaa.emss.utils.FileStorageUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final AdminRepo adminRepo;

    public RegistrationServiceImpl(VenueRepo venueRepo, UserCRepo userCRepo, FileStorageUtils fileStorageUtils, EmailSenderService emailSenderService, PasswordEncoder passwordEncoder, UserRepo userRepo, AdminRepo adminRepo) {
        this.venueRepo = venueRepo;
        this.userCRepo = userCRepo;
        this.fileStorageUtils = fileStorageUtils;
        this.emailSenderService = emailSenderService;
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
        this.adminRepo = adminRepo;
    }

    @Override
    public UserDto userRegistration(UserDto userDto) {
        UserC entity= UserC.builder()
                .name(userDto.getUsername())
                .mobile_no(userDto.getMobile_no())
                .email(userDto.getEmail())
                .city_name(userDto.getCity_name())
                .street_name(userDto.getStreet_name())
                .applicationUserRole(ApplicationUserRole.CLIENT)
                .password(passwordEncoder.encode(userDto.getPassword()))
                .build();
        User entity1= User.builder()
                .email(userDto.getEmail())
                .uname(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .applicationUserRole(ApplicationUserRole.CLIENT).build();
        userRepo.save(entity1);
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
        MultipartFile multipartFile = venueDto.getVenueFile();
        String file = fileStorageUtils.storeFile(multipartFile);
        Venue entity = Venue.builder()
                .id(venueDto.getId())
                .venueName(venueDto.getVenueName())
                .password(passwordEncoder.encode(venueDto.getPassword()))
                .mobile_no(venueDto.getMobile_no())
                .email(venueDto.getEmail())
                .city_name(venueDto.getCity_name())
                .userName(venueDto.getUserName())
                .applicationUserRole(ApplicationUserRole.VENUE)
                .venueStatus(VenueStatus.PENDING)
                .file(file)
                .build();
        entity = venueRepo.save(entity);
        return VenueDto.builder()
                .id(entity.getId())
                .venueName(entity.getVenueName())
                .build();
    }


    public List<VenueDto> getAllPendingRegister() {
        List<Venue> venueList= venueRepo.findPendingRegister(VenueStatus.PENDING);
        return venueList.stream().map(entity -> VenueDto.builder()
                .id(entity.getId())
                .venueName(entity.getVenueName())
                .email(entity.getEmail())
                .city_name(entity.getCity_name())
                .mobile_no(entity.getMobile_no())
                .applicationUserRole(entity.getApplicationUserRole())
                .venueStatus(entity.getVenueStatus())
                .userName(entity.getUserName())
                .capacity(entity.getCapacity())
                .filePath(entity.getFile())
                .description(entity.getDescription())
                .build()).collect(Collectors.toList());
    }

    @Override
    public Integer updateVenueStatus(Integer status, Integer id) {
        Optional<Venue> venue = venueRepo.findById(id);
        if (status == 0) {
            if (venue.isPresent()) {
                Venue venue1 = venue.get();
                User user = new User();
                user.setEmail(venue1.getEmail());
                user.setUname(venue1.getUserName());
                user.setPassword(venue1.getPassword());
                user.setApplicationUserRole(venue1.getApplicationUserRole());
                userRepo.save(user);
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
                return venueRepo.updateVenueStatus(VenueStatus.DELETED, id);
            }
        }
        return null;
    }



    @Override
    public Admin registerAdmin(Admin admin) {
        Admin entity= Admin.builder()
                .name(admin.getName())
                .email(admin.getEmail())
                .password(passwordEncoder.encode(admin.getPassword()))
                .applicationUserRole(ApplicationUserRole.ADMIN)
                .build();
        User entity1= User.builder()
                .email(admin.getEmail())
                .uname(admin.getName())
                .password(passwordEncoder.encode(admin.getPassword()))
                .applicationUserRole(ApplicationUserRole.ADMIN).build();
        userRepo.save(entity1);
        adminRepo.save(entity);
        return Admin.builder()
                .email(entity.getEmail())
                .build();
    }

}
