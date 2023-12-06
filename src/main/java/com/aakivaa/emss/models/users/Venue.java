package com.aakivaa.emss.models.users;

import com.aakivaa.emss.enums.Role;
import com.aakivaa.emss.enums.Status;
import javax.persistence.*;

import com.aakivaa.emss.models.*;
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
        @UniqueConstraint(name="unique_venue_userName",columnNames = "userName"),
        @UniqueConstraint(name="unique_venue_citizenship_no",columnNames = "citizenshipNo")

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
    private Role role;

    @Column(name = "contactNumber", length = 10)
    private String mobile_no;

    @Column(name = "address", length = 45)
    private String city_name;

    @Column(name = "status")
    private Status status;

    @Column(name = "capacity")
    private String capacity;

    @Column (columnDefinition = "Text")
    private String description;

    private String citizenshipNo;

    private String venueType;


    @Lob @Basic(fetch = FetchType.LAZY)
    @Column(name = "filePath")
    private String file;

    private String availableRooms;


    @ElementCollection
    @CollectionTable(name = "venue_images", joinColumns = @JoinColumn(name = "venue_id"))
    @Column(name = "venue_images")
    private List<String> listOfImages;

    @OneToMany(targetEntity = Booking.class,mappedBy = "venue",cascade = CascadeType.ALL)
    private List<Booking> bookingList;

    @ElementCollection
    @CollectionTable(name = "venue_services", joinColumns = @JoinColumn(name = "venue_id"))
    @Column(name = "services")
    private List<String> availableServices;

    @ElementCollection
    @CollectionTable(name = "venue_functions", joinColumns = @JoinColumn(name = "venue_id"))
    @Column(name = "functions")
    private List<String> functionTypes;

    @ElementCollection
    @CollectionTable(name = "venue_recipe_menu", joinColumns = @JoinColumn(name = "venue_id"))
    @Column(name = "recipe_menu")
    private List<String> recipeMenu;

    @OneToMany(targetEntity = Pricing.class,mappedBy = "venue",cascade = CascadeType.ALL)
    private List<Pricing> pricing;

}
