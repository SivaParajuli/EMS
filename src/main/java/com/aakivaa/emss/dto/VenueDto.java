package com.aakivaa.emss.dto;

import com.aakivaa.emss.enums.ApplicationUserRole;
import com.aakivaa.emss.enums.VenueStatus;
import com.aakivaa.emss.models.Pricing;
import com.aakivaa.emss.models.RatingsAndReviews;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@AllArgsConstructor
@Getter
@Builder
@Setter

public class VenueDto {

    private Long id;
    private String venueName;
    private String userName;
    private String mobile_no;
    private String city_name;
    private ApplicationUserRole applicationUserRole;
    private String email;
    private String availableRooms;
    private String password;
    private String citizenShipNo;
    //used while saving
    private MultipartFile venueFile;
    private VenueStatus venueStatus;
    private String description;
    private String capacity;
    //used while listing and sending data to front end
    private String filePath;
    //used while listing and sending data to front end
    private List<String> images;
    private List<String> recipeMenuLists;
    private Double ratings;
    private List<String> reviews;
    private List<Pricing> pricingList;
    private List<String> functionTypes;
    private List<String> services;


}
