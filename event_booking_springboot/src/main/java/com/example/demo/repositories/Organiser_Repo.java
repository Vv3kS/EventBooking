package com.example.demo.repositories;

import javax.transaction.Transactional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Organiser;
@Repository
@Transactional
public interface Organiser_Repo extends JpaRepository<Organiser, Integer> {
	Organiser findByOrganiserId(int organiser_id);

}