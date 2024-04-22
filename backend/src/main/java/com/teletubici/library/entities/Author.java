package com.teletubici.library.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinColumn;

@Entity
public class Author {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	protected Long id;

	protected String name;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)

	@JoinTable(name = "Book_Author", joinColumns = @JoinColumn(name = "author_id", referencedColumnName = "id", nullable = false, updatable = false, insertable = false), inverseJoinColumns = @JoinColumn(name = "book_id", referencedColumnName = "id", nullable = false, updatable = false, insertable = false))
	protected List<Book> books;

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

	public List<Book> getBooks() {
		return books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}

	public Author() {
		super();
		this.books = new ArrayList<>();
	}

}
