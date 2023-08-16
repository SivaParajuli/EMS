package com.aakivaa.emss.models;

import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class RatingsAndReviews implements Serializable {

    @Id
    @SequenceGenerator(name="Ratings_SEG_GEN",sequenceName = "Ratings_SEG_GEN")
    @GeneratedValue(generator = "Ratings_SEG_GEN",strategy = GenerationType.SEQUENCE)

    private Long id;

    private Double ratings;

    private String reviews;

    @ManyToOne(targetEntity = UserC.class,fetch = FetchType.EAGER)
    @JoinColumn(name="userC_id")
    private UserC userC;

    @JsonIgnoreProperties({"venueRatingsAndReviewsList","id","applicationUserRole"})
    @ManyToOne(targetEntity = Venue.class,fetch = FetchType.EAGER)
    @JoinColumn(name="venue_id")
    private Venue venue;
}
