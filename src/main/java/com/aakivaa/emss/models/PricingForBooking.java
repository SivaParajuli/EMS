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
        @Column(name = "id", nullable = false)
        private Long id;

        private String functionName;

        private Long price;

        private String preference;

        private Long guest;

        @OneToMany
        private List<RecipeMenu> recipeMenuList;


        @ManyToOne(targetEntity = Venue.class,fetch =FetchType.EAGER)
        @JoinColumn(name="venue_id")
        private Venue venue;

}

