package com.aakivaa.emss.dto;

import com.aakivaa.emss.enums.ApplicationUserRole;
import com.aakivaa.emss.enums.VenueStatus;
import com.aakivaa.emss.models.EventsCostRate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@AllArgsConstructor
@Getter
@Builder

public class VenueDto {

    private Integer id;
    private String venueName;
    private String userName;
    private String contactNumber;
    private String email;
    private ApplicationUserRole applicationUserRole;
    private String address;
    private String password;
    private VenueStatus venueStatus;
    private String description;
    //used while saving
    private MultipartFile venueFile;
    //used while listing and sending data to front end
    private String filePath;
    private String capacity;
    private List<EventsCostRate> functionList;
}
