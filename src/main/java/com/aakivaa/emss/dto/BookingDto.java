package com.aakivaa.emss.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingDto {
    private Integer id;
    private String functionType;
    private Date bookingDate;
    private String requiredCapacity;
    private String preference;
    private String[] category;
}
