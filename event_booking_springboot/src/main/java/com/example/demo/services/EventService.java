package com.example.demo.services;


import java.util.List;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entities.Event;
import com.example.demo.repositories.EventRepository;



@Service
public class EventService {
	
	@Autowired
	EventRepository erepo;
	

	
	public List<Event> getEvents() {
        return erepo.findAll();
    }

	
	public Event getOne(int eid)
	{
		Event e = null;
		Optional<Event> op =  erepo.findById(eid);
		try
		{
			e = op.get();
		}
		catch(Exception err)
		{
			err.printStackTrace();
		}
		return e;
	}
	
	public String deleteEvent(int eid) {
        erepo.deleteById(eid);
        return "Event Deleted";
    }

	public Event saveEvent(Event e) {
        return erepo.save(e);
    }
	
	public Event getEventById(int eid) {
        return erepo.findById(eid).orElseThrow(EntityNotFoundException::new);
    }



	
	
	
	
	
	
}

