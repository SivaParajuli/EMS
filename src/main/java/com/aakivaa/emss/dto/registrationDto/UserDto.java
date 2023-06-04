package com.aakivaa.emss.dto.registrationDto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class UserDto {

    private Integer id;
    private String username;
    private String email;
    private String mobile_no;
    private String city_name;
    private String street_name;
    private String password;
}
