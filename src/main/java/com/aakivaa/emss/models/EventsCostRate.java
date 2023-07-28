package com.aakivaa.emss.models;

import com.aakivaa.emss.models.users.Venue;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventsCostRate implements Serializable {
    @Id
    @SequenceGenerator(name = "function_id_sequence", sequenceName = "function_id_sequence")
    @GeneratedValue(generator = "function_id_sequence", strategy = GenerationType.SEQUENCE)
    private Long id;

    private Double marriageCost;

    private Double conclaveCost;

    private Double familyFunctionCost;

    private Double collegeEventCost;

    private Double annualMeetCost;

    private Double rate;

    @JsonIgnoreProperties({"password","description","bookingList","functionList","applicationUserRole"})
    @ManyToOne(targetEntity = Venue.class,fetch =FetchType.LAZY)
    @JoinColumn(name="v_id")
    private Venue venue1;
}
