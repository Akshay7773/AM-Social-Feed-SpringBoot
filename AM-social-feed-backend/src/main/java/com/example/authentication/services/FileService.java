package com.example.authentication.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FileService {
    String uploadimage(String path, MultipartFile multipartFile);
}
