package com.aakivaa.emss.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class EventsCostCalculation {
    private Double marriage;
    private Double conclave;
    private Double collegeEvent;
    private Double annualMeet;
    private Double familyParty;
    private Double rate;
}
