package com.aakivaa.emss.models;

import com.aakivaa.emss.models.functionsAndServices.RecipeMenu;
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

        private String price;

        private String preference;

        private String guest;

        @OneToMany
        private List<RecipeMenu> recipeMenuList;


        @ManyToOne(targetEntity = Venue.class,fetch =FetchType.EAGER)
        @JoinColumn(name="venue_id")
        private Venue venue;

}

