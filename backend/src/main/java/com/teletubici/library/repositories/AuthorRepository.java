package com.teletubici.library.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.teletubici.library.entities.Author;

public interface AuthorRepository extends CrudRepository<Author, Long>{
	List<Author> findByName(String name);
	List<Author> findByNameContainingIgnoreCase(String name);
}
