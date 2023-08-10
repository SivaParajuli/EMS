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
public class PricingDto {

    private String functionName;

    private String price;

    private String preference;

    private String guest;

    private List<String> recipe;


}
