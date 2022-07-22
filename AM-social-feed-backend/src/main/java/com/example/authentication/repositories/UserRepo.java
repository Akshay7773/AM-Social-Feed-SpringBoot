package com.example.authentication.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.authentication.models.UserModel;

@Repository
public interface UserRepo extends MongoRepository<UserModel, String> {
    UserModel findByUsername(String username);
}
