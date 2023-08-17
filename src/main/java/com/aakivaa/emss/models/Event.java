package com.aakivaa.emss.models;

import com.aakivaa.emss.enums.EventType;
import com.aakivaa.emss.enums.Status;
import com.aakivaa.emss.models.users.UserC;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder


public class Event implements Serializable {

   @Id
   @SequenceGenerator(name = "event_id_sequence", sequenceName = "event_id_sequence")
   @GeneratedValue(generator = "event_id_sequence", strategy = GenerationType.SEQUENCE)
    private Long id;

    private String location;

    private LocalDateTime dateTime ;

    private Status status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserC user;

    private String sponsored;

    private String ticketPrice;

    private EventType eventType;

    private String mainGuest;

    @ElementCollection
   @CollectionTable(name = "Events_attraction", joinColumns = @JoinColumn(name = "eeventId"))
   @Column(name = "attractions")
   private List<String> centerOfAttractions;

}
