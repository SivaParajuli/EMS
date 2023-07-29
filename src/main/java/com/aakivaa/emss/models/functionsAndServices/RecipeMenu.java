package com.aakivaa.emss.models.functionsAndServices;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.PricingForBooking;
import com.aakivaa.emss.models.users.Venue;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class RecipeMenu implements Serializable {
    @Id
    @SequenceGenerator(name = "recipe_id_sequence", sequenceName = "recipe_id_sequence")
    @GeneratedValue(generator = "recipe_id_sequence", strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;

    private String items;

    private int price;

    @ManyToOne(targetEntity = Venue.class,fetch =FetchType.EAGER)
    @JoinColumn(name="venue_id")
    private Venue venue;

    @ManyToOne(targetEntity = PricingForBooking.class,fetch =FetchType.EAGER)
    @JoinColumn(name="pricing_id")
    private PricingForBooking pricingForBooking;

    @ManyToOne(targetEntity = Booking.class,fetch =FetchType.EAGER)
    @JoinColumn(name="booking_id")
    private Booking booking;



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
