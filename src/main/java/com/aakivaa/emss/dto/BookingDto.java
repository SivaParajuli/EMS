package com.aakivaa.emss.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Date;

@Getter
@AllArgsConstructor
public class BookingDto {
    private Integer id;
    private String functionType;
    private Date bookingDate;
    private String requiredCapacity;
    private String contactNumber;
}
