package com.example.demo.repository;

import com.example.demo.model.Person;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.*;
import software.amazon.awssdk.enhanced.dynamodb.model.*;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class PersonRepository {
    private final DynamoDbEnhancedClient enhancedClient;
    private final DynamoDbTable<Person> personTable;

    public PersonRepository() {
        DynamoDbClient client = DynamoDbClient.builder()
            .region(Region.US_EAST_1)
            .endpointOverride(URI.create("http://localhost:8000"))
            .build();

        this.enhancedClient = DynamoDbEnhancedClient.builder()
            .dynamoDbClient(client)
            .build();

        this.personTable = enhancedClient.table("Person", TableSchema.fromBean(Person.class));
        try {
            personTable.describeTable();
        } catch (Exception e) {
            personTable.createTable();
        }
    }

    public void save(Person person) {
        personTable.putItem(person);
    }

    public Person findById(String id) {
        return personTable.getItem(Key.builder().partitionValue(id).build());
    }

    public void delete(String id) {
        personTable.deleteItem(Key.builder().partitionValue(id).build());
    }

    public List<Person> findAll() {
        return personTable.scan().items().stream().collect(Collectors.toList());
    }
}
