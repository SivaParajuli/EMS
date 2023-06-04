package com.aakivaa.emss.dto.registrationDto;

import com.aakivaa.emss.enums.ApplicationUserRole;
import com.aakivaa.emss.enums.VenueStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VenueRegistration {

    private Integer id;
    private String venueName;
    private String userName;
    private String contactNumber;
    private String email;
    private ApplicationUserRole applicationUserRole;
    private String address;
    private String password;
    private VenueStatus venueStatus;
    //used while saving
    private MultipartFile venueFile;
    //used while listing and sending data to front end
    private String filePath;
}
