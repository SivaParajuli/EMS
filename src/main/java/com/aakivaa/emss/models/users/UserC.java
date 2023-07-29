package com.aakivaa.emss.models.users;

import com.aakivaa.emss.enums.ApplicationUserRole;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.VenueRatingsAndReviews;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="tbl_client",uniqueConstraints = {
        @UniqueConstraint(name="unique_client_email",columnNames = "email"),
        @UniqueConstraint(name="unique_client_mobile_no",columnNames = "mobile_no"),

})

public class UserC implements Serializable {
    @Id
    @SequenceGenerator(name="client_id_sequence",sequenceName="client_id_sequence")
    @GeneratedValue(generator="client_id_sequence",strategy= GenerationType.SEQUENCE)
    private Long id;

    @Column(name="name",length=200)
    private String name;

    private String uName;

    @Column(name="mobile_no",length=10)
    private String mobile_no;

    @Column(name="email")
    private String email;

    @Column(name="password",length=500)
    private String password;

    @Enumerated(EnumType.STRING)
    private ApplicationUserRole applicationUserRole;

    @Column(name="city_address",length=45)
    private String city_name;

    @Column(name="street_address",length=34)
    private String street_name;

    @OneToMany(targetEntity = Booking.class,mappedBy = "userC",cascade = CascadeType.ALL)
    private List<Booking> bookingList;



}
