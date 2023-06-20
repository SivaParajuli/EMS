package com.aakivaa.emss.dto;

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
    private String mobile_no;
    private String city_name;
    private String email;
    private String password;
    private String citizenShipNo;
    //used while saving
    private MultipartFile venueFile;


    private VenueStatus venueStatus;
    private String description;
    private String capacity;
    //used while listing and sending data to front end
    private String filePath;

    //used while saving list of images
    private List<MultipartFile> listOfImages;

    private List<String> listOfFilePaths;

    private List<EventsCostRate> functionList;


}
