package com.aakivaa.emss.models;

import com.aakivaa.emss.models.users.Venue;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class PricingForBooking implements Serializable {

        @Id
        @SequenceGenerator(name = "pricing_id_sequence", sequenceName = "pricing_id_sequence")
        @GeneratedValue(generator = "pricing_id_sequence", strategy = GenerationType.SEQUENCE)
        private Long id;

        private String functionName;

        @Column(name = "price_range")
        private String priceRange;

        private String preference;

        @Column(name = "guest_range")
        private String guestRange;

        @ElementCollection
        @CollectionTable(name = "pricing_recipe_menu", joinColumns = @JoinColumn(name = "pricing_id"))
        @Column(name = "recipe_menu")
        private List<String> recipeMenu;


        @ManyToOne(targetEntity = Venue.class,fetch =FetchType.EAGER)
        @JoinColumn(name="venue_id")
        private Venue venue;

}

