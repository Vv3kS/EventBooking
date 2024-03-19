package com.example.demo.services;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Booking;

import com.example.demo.repositories.BookingRepository;



@Service
public class BookingService {
	
	@Autowired
	BookingRepository brepo;
	

	
	public List<Booking> getBooking() {
        return brepo.findAll();
    }
	
	public String deleteBooking(int bid) {
        brepo.deleteById(bid);
        return "Event Deleted";
    }

	
	
	
	public Booking saveBooking(Booking b) {
        return brepo.save(b);
    }
	
	public Booking getEventById(int bid) {
        return brepo.findById(bid).orElseThrow(EntityNotFoundException::new);
    }


}
