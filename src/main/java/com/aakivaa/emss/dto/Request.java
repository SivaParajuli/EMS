package com.aakivaa.emss.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@AllArgsConstructor
@Setter
@NoArgsConstructor
@Builder
public class Request {
    private Integer status;
}
