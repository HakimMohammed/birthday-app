package org.example.seeders;

import io.quarkus.elytron.security.common.BcryptUtil;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.transaction.Transactional;
import org.example.entities.Client;
import org.example.entities.Friend;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Creates initial data (3 Clients, 60 Friends total) upon application startup.
 * This is useful for development and testing environments.
 */
@ApplicationScoped
public class DataSeeder {

    private static final int NUM_FRIENDS_PER_CLIENT = 20;

    @Transactional
    public void onStart(@Observes StartupEvent ev) {
        // Clear existing data for idempotency in development
        // You might want to skip this in production-like environments
        Friend.deleteAll();
        Client.deleteAll();

        System.out.println("Starting database seeding...");

        // 1. Create 3 Clients
        List<Client> clients = new ArrayList<>();
        String password = BcryptUtil.bcryptHash("pass123");
        clients.add(new Client("Alice Smith", "alice@example.com", password));
        clients.add(new Client("Bob Johnson", "bob@example.com", password));
        clients.add(new Client("Charlie Brown", "charlie@example.com", password));

        Client.persist(clients);
        System.out.println("Created 3 clients.");

        // 2. Create 20 Friends for each Client with successive birthdays
        LocalDate currentDate = LocalDate.now();
        int friendIndex = 0;

        for (int i = 0; i < clients.size(); i++) {
            Client client = clients.get(i);

            for (int j = 0; j < NUM_FRIENDS_PER_CLIENT; j++) {
                // Determine the unique birthday date
                LocalDate birthDate = currentDate.plusDays(friendIndex);

                Friend friend = new Friend(
                        "Friend" + (j + 1),
                        "OfClient" + (i + 1),
                        birthDate,
                        client
                );

                // Add the friend to the client's list (for completeness, though Panache handles persistence)
                client.friends.add(friend);

                friend.persist();
                friendIndex++;
            }
            // Ensure the client object is updated in the persistence context
            client.persist();
            System.out.printf("Client %s created %d friends.\n", client.name, NUM_FRIENDS_PER_CLIENT);
        }

        System.out.printf("Database seeding complete. Total Clients: %d, Total Friends: %d\n",
                Client.count(), Friend.count());
    }
}