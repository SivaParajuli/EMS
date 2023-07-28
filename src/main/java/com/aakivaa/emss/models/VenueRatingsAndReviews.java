package com.aakivaa.emss.models;

import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table
@Entity
public class VenueRatingsAndReviews implements Serializable {

    @Id
    @SequenceGenerator(name="VenueRatings_SEG_GEN",sequenceName = "VenueRatings_SEG_GEN")
    @GeneratedValue(generator = "VenueRatings_SEG_GEN",strategy = GenerationType.SEQUENCE)

    private Long id;

    private double ratings;

    private String reviews;

    @ManyToOne(targetEntity = UserC.class,fetch = FetchType.EAGER)
    @JoinColumn(name="userC_id")
    private UserC userC;

    @ManyToOne(targetEntity = Venue.class,fetch = FetchType.EAGER)
    @JoinColumn(name="venue_id")
    private Venue venue;
}
