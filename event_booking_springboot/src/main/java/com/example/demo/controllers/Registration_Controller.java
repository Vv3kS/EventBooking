package com.example.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Attendee;
import com.example.demo.entities.Login;
import com.example.demo.entities.Organiser;
import com.example.demo.services.Attendee_Wrap;
import com.example.demo.services.Organiser_Service;
import com.example.demo.services.Organiser_Wrap;
import com.example.demo.services.Attendee_Service;


@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class Registration_Controller {
	@Autowired
	Attendee_Service login;
	@Autowired
	Organiser_Service organiser;
	
	@PostMapping("/attendee")
	public ResponseEntity<Object> registerAttedee(@RequestBody Attendee_Wrap wrap)
	{
		try
		{
			Login log= wrap.getLogin();
			Attendee atd= wrap.getAttendee();
			login.saveLogin(log, atd);
			return ResponseEntity.status(HttpStatus.CREATED).body(wrap);
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error saving data: "+e.getMessage());
		}
		
	}
	
	@PostMapping("/organiser")
	public ResponseEntity<Object> registerOrganiser(@RequestBody Organiser_Wrap wrap)
	{
		try
		{
			Login log= wrap.getLogin();
			Organiser org= wrap.getOrganiser();
			organiser.saveLogin(log, org);
			return ResponseEntity.status(HttpStatus.OK).body(wrap);
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error saving data: "+e.getMessage());
		}
		
	}
	@GetMapping("/organiser/{organiserId}")
	public ResponseEntity<Organiser> findOrganiserById(@PathVariable int organiserId) {
	    try {
	        Organiser foundOrganiser = organiser.findById(organiserId);

	        if (foundOrganiser != null) {
	            return ResponseEntity.status(HttpStatus.OK).body(foundOrganiser);
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}
	
	@GetMapping("/login")
	public ResponseEntity<Login> login(@RequestParam String username,@RequestParam String password)
	{
		 System.out.println(username+" "+password);
		Login res= organiser.getOne(username, password);
		if(res==null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		else
			return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	
}
