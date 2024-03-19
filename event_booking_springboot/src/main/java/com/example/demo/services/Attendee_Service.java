package com.example.demo.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Attendee;
import com.example.demo.entities.Login;
import com.example.demo.repositories.Attendee_Repo;
import com.example.demo.repositories.Login_Repo;
@Service
public class Attendee_Service {
	@Autowired
	Login_Repo repo;
	@Autowired
	Attendee_Repo repo2;
	public void saveLogin(Login login,Attendee atn)
	{
		repo.save(login);
	   atn.setLogin(login);
		repo2.save(atn);
	}
}
