package com.aakivaa.emss.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.*;

@Component
public class FileUtils {

    @Value("${venue.file.storage.directory}")
    private String venueFileStoragePath;
    private final String userHome = System.getProperty("user.home");

    public FileUtils(){
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
        return fileStorageLocation;

//        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
//        if(fileName.contains("..")){
//            throw new IOException("not valid file");
//        }
//        String image = Base64.getEncoder().encodeToString(multipartFile.getBytes());

    }

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

    public List<String> makePathToImage(List<String> paths) {
        List<String> images = new ArrayList<>();
        for (String path : paths) {
            String image = getBase64FileFromFilePath(path);
            images.add(image);
        }
        System.out.println("images is here");
        return images;
    }

}

