package com.aakivaa.emss.models.functionsAndServices;

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
public class FunctionTypes implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private String functionName;

    private Long price;

    private String preference;


    @OneToMany
    private List<AvailableServices> availableServices;


    @ManyToOne(targetEntity = Venue.class,fetch =FetchType.EAGER)
    @JoinColumn(name="venue_id")
    private Venue venue;

}
