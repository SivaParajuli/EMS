package com.aakivaa.emss.models;

import com.aakivaa.emss.enums.Status;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
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
    @SequenceGenerator(name="Booking_SEG_GEN",sequenceName = "Booking_SEG_GEN")
    @GeneratedValue(generator = "Booking_SEG_GEN",strategy = GenerationType.SEQUENCE)
    private Long id;

    private LocalDate bookingDate;

    @Column(name="event_type")
    private String eventType;

    @Column(name="requiredCapacity")
    private String requiredCapacity;

    private String preference;

    private String payment;

    @ElementCollection
    @CollectionTable(name = "booking_items", joinColumns = @JoinColumn(name = "booking_id"))
    @Column(name = "items")
    private List<String> items;

    private Status status;

    @JsonIgnoreProperties({"password","bookingList","id","applicationUserRole"})
    @ManyToOne(targetEntity = UserC.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private UserC userC;

    @ElementCollection
    @CollectionTable(name = "booking_recipe_menu", joinColumns = @JoinColumn(name = "booking_id"))
    @Column(name = "recipe_menu")
    private List<String> recipeMenu;

    @JsonIgnoreProperties({"password","description","bookingList","applicationUserRole"})
    @ManyToOne(targetEntity = Venue.class,fetch =FetchType.EAGER)
    @JoinColumn(name="venue_id")
    private Venue venue;

}
