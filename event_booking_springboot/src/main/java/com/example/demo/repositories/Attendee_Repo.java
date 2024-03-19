package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Attendee;
@Repository
public interface Attendee_Repo extends JpaRepository<Attendee, Integer> {
	
}
