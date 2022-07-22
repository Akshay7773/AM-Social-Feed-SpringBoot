package com.example.authentication.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.authentication.models.ImageModel;
import com.example.authentication.models.UserModel;
import com.example.authentication.repositories.ImageRepo;
import com.example.authentication.repositories.UserRepo;
import com.example.authentication.services.FileService;
import com.example.authentication.services.UserService;
import com.example.authentication.utils.JwtUtils;

@RestController
@CrossOrigin()
public class UserController {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    UserService userService;

    // PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    ImageRepo imageRepo;

    // @Value("${project.image}")
    // private String path;

    @Autowired
    FileService fileService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserModel userModel) {
        String username = userModel.getUsername();
        String password = userModel.getPassword();

        UserModel user = userRepo.findByUsername(username);
        if (user != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("user already exists!!");
        }
        try {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String pass = passwordEncoder.encode(password);

            System.out.println(pass + "-----------------");
            userModel.setPassword(pass);
            userRepo.save(userModel);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok("user store to the database successfully");
    }

    @PostMapping("/auth/login")
    private ResponseEntity<?> check(@RequestBody UserModel userModel) {
        String username = userModel.getUsername();
        String password = userModel.getPassword();
        UserDetails loadedUser = userService.loadUserByUsername(username);
        System.out.println(username + "-------------------");
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("please enter valid username and password");
        }

        System.out.println("------" + loadedUser + "------");
        String generatedToken = jwtUtils.generateToken(loadedUser);
        HashMap<String, Object> map = new HashMap<>();
        map.put("user", loadedUser);
        map.put("token", generatedToken);
        map.put("message", "successfully logged into account");
        // System.out.println("------------" + generatedToken + "-------- ");
        return ResponseEntity.ok((map));
    }

    // return ResponseEntity.ok(userRepo.findAll(Sort.by(Sort.Direction.DESC,
    // "id")));
    // @PostMapping("/upload")
    // public ResponseEntity<?> fileUpload(@RequestParam("image") MultipartFile
    // image) {
    // String filename = null;
    // try {
    // filename = this.fileService.uploadimage(path, image);

    // } catch (Exception e) {
    // e.printStackTrace();
    // }
    // return ResponseEntity.ok(filename);
    // }
    @PostMapping("/uploads")
    public ResponseEntity<?> uploadImages(@RequestBody MultipartFile image[], ImageModel imageModel,
            Principal principal)
            throws IOException {

        System.out.println("images-----------------------" + image[0]);

        String path = new ClassPathResource("static/image/").getFile().getAbsolutePath();
        System.out.println(path + "-------------------------");
        String username = principal.getName();
        // System.out.println(username + "---------------------");
        UserModel currentUser = userRepo.findByUsername(username);
        List<String> fileModel = new ArrayList<>();
        for (int i = 0; i < image.length; i++) {

            String filename = image[i].getOriginalFilename().trim();

            String filepath = filename;
            fileModel.add(filepath);

            Files.copy(image[i].getInputStream(), Paths.get(path + "/" + filename),
                    StandardCopyOption.REPLACE_EXISTING);
        }
        imageModel.setImages(fileModel);
        imageModel.setMessage("image uploaded successfully");
        // imageModel.setPostedBy(currentUser);
        String createdBy = currentUser.getId();
        imageModel.setCreatedBy(createdBy);
        imageModel.setPostedBy(currentUser);
        System.out.println("-------------------" + imageModel.getCaption());
        imageRepo.save(imageModel);
        return new ResponseEntity<>(imageModel, HttpStatus.CREATED);
    }

    // @GetMapping("/getbyId")
    // public ResponseEntity<?> getbyId(){

    // }

    @GetMapping("/getall")
    public ResponseEntity<?> getall() {
        return ResponseEntity.ok(imageRepo.findAll(Sort.by(Sort.Direction.DESC,
                "id")));
    }

    @GetMapping("/check")
    public String check() {
        return "everything is okayy";
    }

    @RequestMapping("/home")
    public String home() {
        return "home";
    }

    @PatchMapping("/likes/{id}")
    public ResponseEntity<?> likes(@PathVariable String id, Principal principal) {
        ImageModel post = imageRepo.findById(id).orElse(null);
        String username = principal.getName();
        UserModel user = userRepo.findByUsername(username);
        String currentUserId = user.getId();
        // List<String> likeList = post.getLikes();
        List<String> likeList = post.getLikes();
        // likeList.add("hello world");
        // likeList.add("akshay");
        // likeList.add("saurabh");
        if (likeList.size() == 0) {
            likeList.add(currentUserId);
        } else {
            for (int i = 0; i < likeList.size(); i++) {
                if (likeList.get(i).equals(currentUserId)) {
                    likeList.remove(i);
                } else {
                    System.out.println("--------------no match found-----------------");
                    likeList.add(currentUserId);
                }
            }
        }

        post.setLikes(likeList);
        imageRepo.save(post);
        // System.out.println(post + "------------------------------------");
        return ResponseEntity.ok(likeList);
    }
}