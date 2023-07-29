package com.aakivaa.emss.dto;

import com.aakivaa.emss.enums.ApplicationUserRole;
import com.aakivaa.emss.enums.VenueStatus;
import com.aakivaa.emss.models.EventsCostRate;
import com.aakivaa.emss.models.PricingForBooking;
import com.aakivaa.emss.models.VenueRatingsAndReviews;
import com.aakivaa.emss.models.functionsAndServices.AvailableServices;
import com.aakivaa.emss.models.functionsAndServices.FunctionTypes;
import com.aakivaa.emss.models.functionsAndServices.RecipeMenu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.OneToMany;
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

    //used while saving list of images
    private List<MultipartFile> multipartFileList;

    private List<String> listOfFilePaths;

    private List<EventsCostRate> functionList;

    private List<VenueRatingsAndReviews> venueRatingsAndReviewsList;

    private List<RecipeMenu> recipeMenuList;

    private List<FunctionTypes> functionTypesList;

    private List<AvailableServices> availableServices;

    private List<AvailableServices> availableServicesList;

    private List<RecipeMenu> recipeMenuLists;

    private RecipeMenu recipeMenu;

    private FunctionTypes functionTypes;

    private Double ratings;

    private List<VenueRatingsAndReviews> ratingsAndReviewsList;

    private List<PricingForBooking> pricingForBookingList;


}
