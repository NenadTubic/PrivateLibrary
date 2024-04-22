package com.teletubici.library.controllers;

import java.util.ArrayList;
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
import com.teletubici.library.entities.dto.AuthorDTO;
import com.teletubici.library.repositories.AuthorRepository;

@RestController
@RequestMapping(path = "/api/v1/author")
@CrossOrigin(origins = "*")
public class AuthorController {
	@Autowired
	AuthorRepository AuthorRepository;
	
	@RequestMapping(method=RequestMethod.POST)
	public AuthorDTO createAuthor(@RequestBody Author author) {
		Author a = new Author();		
		a.setName(author.getName());
		AuthorRepository.save(a);
		return new AuthorDTO(a);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public Iterable<AuthorDTO> getAllAuthors() {
		Iterable<Author> l = AuthorRepository.findAll();
		ArrayList<AuthorDTO> ll = new ArrayList<>();
		for(Author a : l) {
			ll.add(new AuthorDTO(a));
		}
		return ll;
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/{id}")
	public ResponseEntity<AuthorDTO> getAuthor(@PathVariable Long id) {
		Optional<Author> o = AuthorRepository.findById(id);
		if(o.isPresent()){
			return new ResponseEntity<AuthorDTO>(new AuthorDTO(o.get()), HttpStatus.OK);
		}else{
			return new ResponseEntity<AuthorDTO>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/{id}")
	public ResponseEntity<AuthorDTO> removeAuthor(@PathVariable Long id) {
		Optional<Author> o = AuthorRepository.findById(id);
		if(o.isPresent()){
			AuthorRepository.deleteById(id);
			return new ResponseEntity<AuthorDTO>(new AuthorDTO(o.get()), HttpStatus.OK);
		}else{
			return new ResponseEntity<AuthorDTO>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/{id}")
	public ResponseEntity<AuthorDTO> updateAuthor(@PathVariable Long id, @RequestBody Author author) {
		Optional<Author> o = AuthorRepository.findById(id);
		if(o.isPresent()){
			Author a = o.get();
			a.setName(author.getName());
			AuthorRepository.save(a);
			return new ResponseEntity<AuthorDTO>(new AuthorDTO(a), HttpStatus.OK);
		}else{
			return new ResponseEntity<AuthorDTO>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/byname")
	public Iterable<AuthorDTO> getAuthorByName(@RequestParam String name) {
		Iterable<Author> l = AuthorRepository.findByName(name);
		ArrayList<AuthorDTO> ll = new ArrayList<>();
		for(Author a : l) {
			ll.add(new AuthorDTO(a));
		}
		return ll;
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/search")
	public Iterable<AuthorDTO> searchAuthorByName(@RequestParam String name) {
		Iterable<Author> l = AuthorRepository.findByNameContainingIgnoreCase(name);
		ArrayList<AuthorDTO> ll = new ArrayList<>();
		for(Author g : l) {
			ll.add(new AuthorDTO(g));
		}
		return ll;
	}
}
