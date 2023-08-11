package com.aakivaa.emss.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@AllArgsConstructor
@Getter
@Builder
@Setter
public class EventAndServicesDto {
    private String capacity;
    private String availableRooms;
    private List<String> functionTypes;
    private List<String> availableServices;
    private List<String> recipe;
}
