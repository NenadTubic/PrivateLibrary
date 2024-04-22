package com.teletubici.library.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.teletubici.library.entities.Book;

public interface BookRepository extends CrudRepository<Book, Long>{
	List<Book> findByTitleContainingIgnoreCase(String title);
}
