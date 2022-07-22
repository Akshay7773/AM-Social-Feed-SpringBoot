package com.example.authentication.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("images")
public class ImageModel {
    @Id
    private String id;
    private String message;
    private List<String> images;
    private UserModel postedBy;
    private String createdBy;
    private String caption;
    private List<String> likes;

    public List<String> getLikes() {
        return likes;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public UserModel getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(UserModel postedBy) {
        this.postedBy = postedBy;
    }

    public ImageModel() {
    }

    public ImageModel(String message, List<String> images, String id, String createdBy, UserModel postedBy,
            String caption, List<String> likes) {
        this.message = message;
        this.images = images;
        this.id = id;
        this.createdBy = createdBy;
        this.postedBy = postedBy;
        this.caption = caption;
        this.likes = likes;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public String getId() {
        return id;
    }

    // public void setId(String id) {
    // this.id = id;
    // }

}
