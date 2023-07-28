package com.aakivaa.emss.models.users;

import com.aakivaa.emss.enums.ApplicationUserRole;
import com.aakivaa.emss.enums.VenueStatus;
import javax.persistence.*;

import com.aakivaa.emss.models.*;
import com.aakivaa.emss.models.functionsAndServices.AvailableServices;
import com.aakivaa.emss.models.functionsAndServices.RecipeMenu;
import com.aakivaa.emss.models.functionsAndServices.FunctionTypes;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="tbl_venue",uniqueConstraints = {
        @UniqueConstraint(name="unique_venue_email",columnNames = "email"),
        @UniqueConstraint(name="unique_venue_contactNumber",columnNames = "contactNumber"),
        @UniqueConstraint(name="unique_venue_userName",columnNames = "userName")

})

public class Venue implements Serializable {

    @Id
    @SequenceGenerator(name = "owner_id_sequence", sequenceName = "owner_id_sequence")
    @GeneratedValue(generator = "owner_id_sequence", strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "v_name", length = 200)
    private String venueName;

    @Column(name = "userName")
    private String userName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    private ApplicationUserRole applicationUserRole;

    @Column(name = "contactNumber", length = 10)
    private String mobile_no;

    @Column(name = "address", length = 45)
    private String city_name;

    @Column(name = "venueStatus")
    private VenueStatus venueStatus;

    @Column(name = "capacity")
    private String capacity;

    @Column (columnDefinition = "Text")
    private String description;

    private String citizenshipNo;


    @Lob @Basic(fetch = FetchType.LAZY)
    @Column(name = "filePath")
    private String file;

    private String availableRooms;


    @Column(columnDefinition = "MEDIUMBLOB")
    @OneToMany
    private List<Images> listOfImages;


    @OneToMany(targetEntity = Booking.class,mappedBy = "venue",cascade = CascadeType.ALL)
    private List<Booking> bookingList;

    @OneToMany(targetEntity = EventsCostRate.class,mappedBy = "venue1",cascade = CascadeType.ALL)
    private List<EventsCostRate> functionList;


    private Long totalRatings;

    private int numberOfRatedClients;

    @OneToMany(targetEntity = VenueRatingsAndReviews.class, mappedBy = "venue",cascade = CascadeType.ALL)
    private List<VenueRatingsAndReviews> venueRatingsAndReviewsList;

    @OneToMany
    private List<RecipeMenu> recipeMenuList;

    @OneToMany
    private List<FunctionTypes> functionTypesList;

    @OneToMany
    private List<PricingForBooking> pricing;

    @OneToMany
    private List<AvailableServices> availableServicesList;




}
