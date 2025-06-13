package com.example.demo.service;

import com.example.demo.model.Person;
import com.example.demo.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    @Autowired private PersonRepository repository;

    public void create(Person p) { repository.save(p); }
    public Person read(String id) { return repository.findById(id); }
    public List<Person> list() { return repository.findAll(); }
    public void delete(String id) { repository.delete(id); }
}
