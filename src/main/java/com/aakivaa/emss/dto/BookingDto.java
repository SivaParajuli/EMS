package com.aakivaa.emss.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingDto {
    private Integer id;
    private String functionType;
    private LocalDate bookingDate;
    private String requiredCapacity;
    private String preference;
    private List<String> recipeList;
    private List<String> items;
}
