package com.example.authentication.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public String uploadimage(String path, MultipartFile file) {
        // TODO Auto-generated method stub

        // File name
        String name = file.getOriginalFilename();

        // Full path
        String filepath = path + File.separator + name;
        // create folder if not created
        File f = new File(path);
        if (!f.exists()) {
            f.mkdir();
        }

        try {
            Files.copy(file.getInputStream(), Paths.get(filepath));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return name;
    }

}
