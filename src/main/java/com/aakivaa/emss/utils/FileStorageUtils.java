package com.aakivaa.emss.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.*;

@Component
public class FileStorageUtils {

    @Value("${venue.file.storage.directory}")
    private String venueFileStoragePath;
    private String userHome = System.getProperty("user.home");

    public FileStorageUtils(){
    }

    public String storeFile(MultipartFile multipartFile) throws IOException {

        String directoryPath = userHome+venueFileStoragePath;
        File directoryFile = new File(directoryPath);
        if(!directoryFile.exists()){
            directoryFile.mkdirs();
        }else {
            System.out.println("directory already exists..");
        }
        String fileStorageLocation = directoryPath+File.separator+UUID.randomUUID()+"_"+multipartFile.getOriginalFilename();
        File fileToSave = new File(fileStorageLocation);
        multipartFile.transferTo(fileToSave);

//        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
//        if(fileName.contains("..")){
//            throw new IOException("not valid file");
//        }
//        String image = Base64.getEncoder().encodeToString(multipartFile.getBytes());
        return fileStorageLocation;
    }
                    //check
//    public List<String> storeMultipleImages(List<MultipartFile> multipartFileList) throws IOException{
//        List<String> imagePathList = new ArrayList<>();
//        for (MultipartFile multipartFile : multipartFileList) {
//            String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
//            if (fileName.contains("..")) {
//                throw new IOException("not valid file");
//            }
//            String image = Base64.getEncoder().encodeToString(multipartFile.getBytes());
//            imagePathList.add(image);
//        }
//        return imagePathList;
//    }

    public String getBase64FileFromFilePath(String filePath) {
        File readingFile = new File(filePath);
        if(readingFile.exists()){
            System.out.println("file found");
            byte[] bytes = new byte[0];
            try {
                bytes = Files.readAllBytes(readingFile.toPath());
            } catch (IOException e) {
                System.out.println("IO Exceptions....");
                e.printStackTrace();
            }

            String base64String = Base64.getEncoder().encodeToString(bytes);
            return "data:image/jpeg;base64,"+base64String;

        }else {
            System.out.println("file not found");
            return null;
        }
    }

}

