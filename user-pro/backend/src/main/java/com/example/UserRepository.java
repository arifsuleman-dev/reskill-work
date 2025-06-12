package com.example;

import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.enhanced.dynamodb.Key;

@Repository
public class UserRepository {
    private final DynamoDbTable<User> userTable;

    public UserRepository() {
        DynamoDbClient dynamoDbClient = DynamoDbClient.create();
        DynamoDbEnhancedClient enhancedClient = DynamoDbEnhancedClient.builder()
                .dynamoDbClient(dynamoDbClient)
                .build();

        userTable = enhancedClient.table("Users", TableSchema.fromBean(User.class));
    }

    public void save(User user) { userTable.putItem(user); }
    public User findById(String userId) { return userTable.getItem(Key.builder().partitionValue(userId).build()); }
    public void update(User user) { userTable.updateItem(user); }
    public void delete(String userId) { userTable.deleteItem(Key.builder().partitionValue(userId).build()); }
}
