package com.example.authentication.models;

import org.springframework.data.annotation.Id;

public class CommentModel {
    @Id
    private String id;
    private String text;

    public CommentModel() {
    }

    public CommentModel(String id, String text) {
        this.id = id;
        this.text = text;
    }

    public String getId() {
        return id;
    }

    // public void setId(String id) {
    // this.id = id;
    // }
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}
