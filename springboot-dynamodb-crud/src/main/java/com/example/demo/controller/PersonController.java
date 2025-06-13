package com.example.demo.controller;

import com.example.demo.model.Person;
import com.example.demo.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/person")
public class PersonController {
    @Autowired private PersonService service;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Person p) {
        service.create(p);
        return ResponseEntity.ok("Created");
    }

    @GetMapping("/{id}")
    public Person get(@PathVariable String id) {
        return service.read(id);
    }

    @GetMapping
    public List<Person> getAll() {
        return service.list();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.ok("Deleted");
    }
}
