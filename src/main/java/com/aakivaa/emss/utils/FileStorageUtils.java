package com.aakivaa.emss.utils;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Component
public class FileStorageUtils {

    public FileStorageUtils(){
    }

    public String storeFile(MultipartFile multipartFile) throws IOException {

        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        if(fileName.contains("..")){
            throw new IOException("not valid file");
        }
        String image = Base64.getEncoder().encodeToString(multipartFile.getBytes());
        return image;
    }

    public List<String> storeMultipleImages(List<MultipartFile> multipartFileList) throws IOException{
        List<String> imagePathList = new ArrayList<>();
        for (MultipartFile multipartFile : multipartFileList) {
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
            if (fileName.contains("..")) {
                throw new IOException("not valid file");
            }
            String image = Base64.getEncoder().encodeToString(multipartFile.getBytes());
            imagePathList.add(image);
        }
        return imagePathList;
    }

}

