package com.aakivaa.emss.models;

import com.aakivaa.emss.enums.BookingStatus;
import com.aakivaa.emss.enums.EventType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Booking implements Serializable {

    @Id
    @SequenceGenerator(name="BookingRequest_SEG_GEN",sequenceName = "BookingRequest_SEG_GEN")
    @GeneratedValue(generator = "BookingRequest_SEG_GEN",strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Temporal(TemporalType.DATE)
    private Date bookingDate;

    @Column(name="functionType")
    private EventType eventType;

    @Column(name="requiredCapacity")
    private String requiredCapacity;

    private BookingStatus bookingStatus;

    @Column(name="contactNumber")
    private String contactNumber;

    private Double calculatedPayment;

    @JsonIgnoreProperties({"password","bookingList","id","applicationUserRole"})
    @ManyToOne(targetEntity = UserC.class,fetch =FetchType.EAGER)
    @JoinColumn(name="client_id",foreignKey = @ForeignKey(name ="Fk_BR_clientId"))
    private UserC userC;

    @JsonIgnoreProperties({"password","description","bookingList","applicationUserRole"})
    @ManyToOne(targetEntity = Venue.class,fetch =FetchType.EAGER)
    @JoinColumn(name="venue_id",foreignKey = @ForeignKey(name ="Fk_BR_venueId"))
    private Venue venue;

}
