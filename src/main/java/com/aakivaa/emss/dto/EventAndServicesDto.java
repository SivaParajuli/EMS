package com.aakivaa.emss.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;



@AllArgsConstructor
@Getter
@Builder
@Setter
public class EventTypeAndServicesDto {
    private String capacity;
    private String availableRooms;
    private String[] functionTypes;
    private String[] availableServices;

}
