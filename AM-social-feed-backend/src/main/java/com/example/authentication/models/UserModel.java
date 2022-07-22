package com.example.authentication.models;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.validation.annotation.Validated;

@Validated
@Document("allusers")
public class UserModel {
    @Id
    private String id;
    @Valid
    @NotNull(message = "name must be valid")
    // @Size(min = 2, max = 5, message = "size must be greater than 2 and less than
    // 6")
    @Email(message = "username must be valid email address")
    private String username;
    @NotNull(message = "password must not null")

    @Size(min = 8, max = 12, message = "password size must be greater than 8 and less than 12")
    private String password;
    private String firstname;
    private String lastname;

    public UserModel() {
    }

    public UserModel(String id, String username, String password, String firstname, String lastname) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getId() {
        return id;
    }

    // public void setId(String id) {
    // this.id = id;
    // }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
