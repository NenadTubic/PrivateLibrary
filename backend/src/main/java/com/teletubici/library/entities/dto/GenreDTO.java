package com.teletubici.library.entities.dto;

import java.util.ArrayList;
import java.util.List;

import com.teletubici.library.entities.Book;
import com.teletubici.library.entities.Genre;

public class GenreDTO {
	protected Long id;

	String name;

	protected List<BookDTO> books;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<BookDTO> getBooks() {
		return books;
	}

	public void setBooks(List<BookDTO> books) {
		this.books = books;
	}

	public GenreDTO() {
		super();
		this.books = new ArrayList<>();
	}

	public GenreDTO(Genre a) {
		super();
		this.name = a.getName();
		this.id = a.getId();
		this.books = new ArrayList<>();
		for (Book b : a.getBooks()) {
			BookDTO bd = new BookDTO(b);
			this.books.add(bd);
		}
	}
}
