package com.example.demo.entities;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name="booking")
public class Booking {
	 @Id
	 int bookingId;
	 
	 @JsonIgnoreProperties("booking")
	    @ManyToOne
	    @JoinColumn(name = "attendeeID")
	    private Attendee attendee;
	 
	 @JsonIgnoreProperties("booking")
	    @ManyToOne
	    @JoinColumn(name = "eventId")
	    private Event event;
	 
	 @Column(name="bookingDate")
		Date bookingDate;
	 
	 @Column(name="ticketQuantity")
		String ticketQuantity;
	 
	 @Column(name="totalCost")
		Double totalCost;

	public int getBookingId() {
		return bookingId;
	}

	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}

	public Attendee getAttendee() {
		return attendee;
	}

	public void setAttendee(Attendee attendee) {
		this.attendee = attendee;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	public Date getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(Date bookingDate) {
		this.bookingDate = bookingDate;
	}

	public String getTicketQuantity() {
		return ticketQuantity;
	}

	public void setTicketQuantity(String ticketQuantity) {
		this.ticketQuantity = ticketQuantity;
	}

	public Double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(Double totalCost) {
		this.totalCost = totalCost;
	}

	public Booking(int bookingId, Attendee attendee, Event event, Date bookingDate, String ticketQuantity,
			Double totalCost) {
		super();
		this.bookingId = bookingId;
		this.attendee = attendee;
		this.event = event;
		this.bookingDate = bookingDate;
		this.ticketQuantity = ticketQuantity;
		this.totalCost = totalCost;
	}

	public Booking(Attendee attendee, Event event, Date bookingDate, String ticketQuantity, Double totalCost) {
		super();
		this.attendee = attendee;
		this.event = event;
		this.bookingDate = bookingDate;
		this.ticketQuantity = ticketQuantity;
		this.totalCost = totalCost;
	}

	@Override
	public String toString() {
		return "Booking [bookingId=" + bookingId + ", attendee=" + attendee + ", event=" + event
				+ ", bookingDate=" + bookingDate + ", ticketQuantity=" + ticketQuantity + ", totalCost=" + totalCost
				+ "]";
	}
	
	
	
	 
	 
	 
	 

}
