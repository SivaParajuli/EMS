package com.aakivaa.emss.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class BookingData {
private String payment;
private LocalDate bookingDate;
private String capacity;

}
