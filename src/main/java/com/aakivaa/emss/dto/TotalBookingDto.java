package com.aakivaa.emss.dto;

import com.aakivaa.emss.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TotalBookingDto {

        private String functionType;
        private LocalDate bookingDate;
        private String requiredCapacity;
        private String preference;
        private List<String> recipeList;
        private List<String> items;
        private String venueName;
        private Status status;
        private String userName;
        private String venueEmail;
        private String userEmail;
}
