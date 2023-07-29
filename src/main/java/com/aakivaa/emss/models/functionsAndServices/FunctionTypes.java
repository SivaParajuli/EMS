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
    @SequenceGenerator(name = "function_id_sequence", sequenceName = "function_id_sequence")
    @GeneratedValue(generator = "function_id_sequence", strategy = GenerationType.SEQUENCE)
    private Long id;
    private String functionName;

    @ManyToOne(targetEntity = Venue.class,fetch =FetchType.EAGER)
    @JoinColumn(name="venue_id")
    private Venue venue;

}
