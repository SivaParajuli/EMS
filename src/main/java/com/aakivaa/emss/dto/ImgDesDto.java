package com.aakivaa.emss.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ImgDesDto {
     private List<MultipartFile> imageList;
     private String description;

}
