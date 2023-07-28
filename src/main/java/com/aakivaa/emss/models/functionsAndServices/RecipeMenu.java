package com.aakivaa.emss.models.functionsAndServices;

import com.aakivaa.emss.models.PricingForBooking;
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
public class RecipeMenu implements Serializable {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    private String items;

    private int price;

    @ManyToOne
    private PricingForBooking pricingForBooking;

    @ManyToOne(targetEntity = Venue.class,fetch =FetchType.EAGER)
    @JoinColumn(name="venue_id")
    private Venue venue;


//    @OneToMany
//    private List<Deserts> desertsList;
//
//    @OneToMany
//    private List<Dinner> DinnerList;
//
//    @OneToMany
//    private List<Drinks> DrinksList;
//
//    @OneToMany
//    private List<Lunch> lunchList;
//
//    @OneToMany
//    private List<Starter> starterList;



}
