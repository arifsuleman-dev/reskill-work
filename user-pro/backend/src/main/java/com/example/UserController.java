package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping
    public String createUser(@RequestBody User user) {
        userRepo.save(user);
        return "User created";
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable String userId) {
        User user = userRepo.findById(userId);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{userId}")
    public String updateUser(@PathVariable String userId, @RequestBody User user) {
        user.setUserId(userId);
        userRepo.update(user);
        return "User updated";
    }

    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable String userId) {
        userRepo.delete(userId);
        return "User deleted";
    }
}
