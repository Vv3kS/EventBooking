package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Booking;
import com.example.demo.services.BookingService;


	
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BookingController {

	@Autowired
	BookingService bservice;
	

	
	@GetMapping("/getallbooking")
	public List<Booking> getBooking()
	{
		return bservice.getBooking();
	}
	
	
	@PostMapping("/savebooking")
	public Booking saveBooking(@RequestBody Booking b)
	{
		return bservice.saveBooking(b);		
	}
	
	@GetMapping("/events/{bid}")
	public Booking findEventById(@PathVariable int bid) {
	    return bservice.getEventById(bid);
	}
	
	@DeleteMapping("/delete/{bid}") 
    public String deleteEvent(@PathVariable int bid) {
        return bservice.deleteBooking(bid);
    }
	

}
