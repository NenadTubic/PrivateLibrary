package com.teletubici.library.entities.dto;

import java.util.ArrayList;
import java.util.List;

import com.teletubici.library.entities.Author;
import com.teletubici.library.entities.Book;

public class BookDTO {
	protected Long id;
	protected String title;
	protected String isbn;
	protected String year;
	protected Double rating;
	protected List<String> authors;
	protected String genre;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	public List<String> getAuthors() {
		return authors;
	}

	public void setAuthors(List<String> authors) {
		this.authors = authors;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public BookDTO() {
		super();
		this.authors = new ArrayList<>();
	}

	public BookDTO(Book b) {
		super();
		this.id = b.getId();
		this.title = b.getTitle();
		this.isbn = b.getIsbn();
		this.year = b.getYear();
		this.rating = b.getRating();
		this.authors = new ArrayList<>();
		for (Author a : b.getAuthors()) {
			this.authors.add(a.getName());
		}
		this.genre = b.getGenre().getName();
	}

}
