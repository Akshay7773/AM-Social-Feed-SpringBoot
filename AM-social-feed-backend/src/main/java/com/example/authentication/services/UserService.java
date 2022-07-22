package com.example.authentication.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.authentication.models.UserModel;
import com.example.authentication.repositories.UserRepo;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        UserModel foundeduser = userRepo.findByUsername(username);
        if (foundeduser == null)
            return null;
        String name = foundeduser.getUsername();
        String pass = foundeduser.getPassword();
        return new User(name, pass, new ArrayList<>());
    }

}
