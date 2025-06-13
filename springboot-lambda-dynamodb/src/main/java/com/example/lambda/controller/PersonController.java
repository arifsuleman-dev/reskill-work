package com.example.lambda.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.example.lambda.model.Person;

@RestController
@RequestMapping("/person")
public class PersonController {

    private Map<String, Person> personStore = new HashMap<>();

    @PostMapping
    public Person create(@RequestBody Person p) {
        personStore.put(p.getId(), p);
        return p;
    }

    @GetMapping("/{id}")
    public Person get(@PathVariable String id) {
        return personStore.get(id);
    }

    @GetMapping
    public Collection<Person> getAll() {
        return personStore.values();
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        personStore.remove(id);
        return "Deleted";
    }
}
