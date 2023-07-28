package com.aakivaa.emss.models.functionsAndServices;

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
public class AvailableServices implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    @ManyToOne(targetEntity = Venue.class,fetch = FetchType.EAGER)
    @JoinColumn(name="venue_id")
    private Venue venue;
}
