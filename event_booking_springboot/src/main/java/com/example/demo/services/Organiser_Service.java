package com.example.demo.services;

import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entities.Login;
import com.example.demo.entities.Organiser;
import com.example.demo.repositories.Login_Repo;
import com.example.demo.repositories.Organiser_Repo;
@Service
public class Organiser_Service {
	@Autowired
	Login_Repo repo;
	@Autowired
	Organiser_Repo repo2;
	public void saveLogin(Login login,Organiser org)
	{
		repo.save(login);
	   org.setLogin(login);
		repo2.save(org);
	}
	public Login getOne(String username,String password)
	{
		
		Login login= repo.findById(username,password);
		return login;
	}
	public Organiser findById(int organiserId) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
    
}
