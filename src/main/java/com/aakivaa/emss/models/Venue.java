package com.aakivaa.emss.models;

import com.aakivaa.emss.enums.ApplicationUserRole;
import com.aakivaa.emss.enums.VenueStatus;
import jakarta.persistence.*;
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
    private Integer id;

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
    private String contactNumber;

    @Column(name = "address", length = 45)
    private String address;

    @Column(name = "venueStatus")
    private VenueStatus venueStatus;

    @Column(name = "capacity")
    private String capacity;

    @Column (columnDefinition = "Text")
    private String description;


    @Lob @Basic(fetch = FetchType.LAZY)
    @Column(columnDefinition = "MEDIUMBLOB")
    private String image;

    @OneToMany(targetEntity = Booking.class,mappedBy = "venue",cascade = CascadeType.ALL)
    private List<Booking> bookingList;

    @OneToMany(targetEntity = EventsCostRate.class,mappedBy = "venue1",cascade = CascadeType.ALL)
    private List<EventsCostRate> functionList;

}
