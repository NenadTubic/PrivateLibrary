package com.teletubici.library.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teletubici.library.entities.Author;
import com.teletubici.library.entities.Book;
import com.teletubici.library.entities.Genre;
import com.teletubici.library.entities.dto.BookDTO;
import com.teletubici.library.repositories.AuthorRepository;
import com.teletubici.library.repositories.BookRepository;
import com.teletubici.library.repositories.GenreRepository;

@RestController
@RequestMapping(path = "/api/v1/book")
@CrossOrigin(origins = "*")
public class BookController {
    @Autowired
    BookRepository bookRepository;

    @Autowired
    GenreRepository genreRepository;

    @Autowired
    AuthorRepository authorRepository;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<BookDTO> createBook(@RequestBody BookDTO dto) {
        Book b = new Book();
        b.setIsbn(dto.getIsbn());
        b.setRating(dto.getRating());
        b.setTitle(dto.getTitle());
        b.setYear(dto.getYear());
        List<Genre> lg = genreRepository.findByName(dto.getGenre());
        if (lg.isEmpty()) {
            Genre g = new Genre();
            g.setName(dto.getGenre());
            genreRepository.save(g);
            b.setGenre(g);
        } else {
            b.setGenre(lg.get(0));
        }

        for (String a : dto.getAuthors()) {
            List<Author> la = authorRepository.findByName(a);
            if (la.isEmpty()) {
                Author na = new Author();
                na.setName(a);
                authorRepository.save(na);
                b.getAuthors().add(na);
            } else {
                b.getAuthors().add(la.get(0));
            }
        }
        bookRepository.save(b);
        return new ResponseEntity<>(new BookDTO(b), HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Iterable<BookDTO>> getAllBooks() {
        Iterable<Book> l = bookRepository.findAll();
        ArrayList<BookDTO> ll = new ArrayList<>();
        for (Book b : l) {
            ll.add(new BookDTO(b));
        }
        return new ResponseEntity<>(ll, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public ResponseEntity<BookDTO> getBook(@PathVariable Long id) {
        Optional<Book> o = bookRepository.findById(id);
        return o.map(book -> new ResponseEntity<>(new BookDTO(book), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public ResponseEntity<BookDTO> removeBook(@PathVariable Long id) {
        Optional<Book> o = bookRepository.findById(id);
        if (o.isPresent()) {
            bookRepository.deleteById(id);
            return new ResponseEntity<>(new BookDTO(o.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable Long id, @RequestBody BookDTO dto) {
        Optional<Book> o = bookRepository.findById(id);
        if (o.isPresent()) {
            Book b = o.get();
            b.setIsbn(dto.getIsbn());
            b.setRating(dto.getRating());
            b.setTitle(dto.getTitle());
            b.setYear(dto.getYear());
            List<Genre> lg = genreRepository.findByName(dto.getGenre());
            if (lg.isEmpty()) {
                Genre g = new Genre();
                g.setName(dto.getGenre());
                genreRepository.save(g);
                b.setGenre(g);
            } else {
                b.setGenre(lg.get(0));
            }
            b.getAuthors().clear();
            for (String a : dto.getAuthors()) {
                List<Author> la = authorRepository.findByName(a);
                if (la.isEmpty()) {
                    Author na = new Author();
                    na.setName(a);
                    authorRepository.save(na);
                    b.getAuthors().add(na);
                } else {
                    b.getAuthors().add(la.get(0));
                }
            }
            bookRepository.save(b);
            return new ResponseEntity<>(new BookDTO(b), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search")
    public ResponseEntity<Iterable<BookDTO>> searchBookByName(@RequestParam String title) {
        Iterable<Book> l = bookRepository.findByTitleContainingIgnoreCase(title);
        ArrayList<BookDTO> ll = new ArrayList<>();
        for (Book g : l) {
            ll.add(new BookDTO(g));
        }
        return new ResponseEntity<>(ll, HttpStatus.OK);
    }
}
