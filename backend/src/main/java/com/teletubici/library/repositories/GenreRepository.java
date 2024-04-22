package com.teletubici.library.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.teletubici.library.entities.Genre;

public interface GenreRepository extends CrudRepository<Genre, Long> {
	List<Genre> findByName(String name);
	List<Genre> findByNameContainingIgnoreCase(String name);
}
