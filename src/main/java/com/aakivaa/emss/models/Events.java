package com.aakivaa.emss.models;

import com.aakivaa.emss.enums.EventType;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder


public class Events implements Serializable {

   @Id
    private Long id;

    private String location;

    private String sponsored;

    private String ticketPrice;

    private EventType eventType;

    private String mainGuest;


}
