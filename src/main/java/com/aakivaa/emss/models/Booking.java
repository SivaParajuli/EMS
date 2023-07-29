package com.aakivaa.emss.models;

import com.aakivaa.emss.enums.BookingStatus;
import com.aakivaa.emss.models.functionsAndServices.RecipeMenu;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Booking implements Serializable {

    @Id
    @SequenceGenerator(name="BookingRequest_SEG_GEN",sequenceName = "BookingRequest_SEG_GEN")
    @GeneratedValue(generator = "BookingRequest_SEG_GEN",strategy = GenerationType.SEQUENCE)
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date bookingDate;

    @Column(name="event_type")
    private String eventType;

    @Column(name="requiredCapacity")
    private String requiredCapacity;

    private String preference;

    private BookingStatus bookingStatus;

    @JsonIgnoreProperties({"password","bookingList","id","applicationUserRole"})
    @ManyToOne(targetEntity = UserC.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private UserC userC;

    @OneToMany
    private List<RecipeMenu> recipeMenuList;

    @JsonIgnoreProperties({"password","description","bookingList","applicationUserRole"})
    @ManyToOne(targetEntity = Venue.class,fetch =FetchType.EAGER)
    @JoinColumn(name="venue_id")
    private Venue venue;

}
