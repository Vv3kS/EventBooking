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

import com.example.demo.entities.Event;


import com.example.demo.services.EventService;

@CrossOrigin(origins ="http://localhost:3000")

@RestController
public class EventController {
	
	
	@Autowired
	EventService eservice;
	

	
	@GetMapping("/getallevent")
	public List<Event> getEvents()
	{
		return eservice.getEvents();
	}
	
	
	@PostMapping("/saveevent")
	public Event saveEvent(@RequestBody Event e)
	{
		System.out.println(e);
		return eservice.saveEvent(e);		
	}
	
	@GetMapping("/events/{eid}")
	public Event findEventById(@PathVariable int eid) {
	    return eservice.getEventById(eid);
	}
	
	@DeleteMapping("/delete/{eid}") 
    public String deleteEvent(@PathVariable int eid) {
        return eservice.deleteEvent(eid);
    }
	
	


}
