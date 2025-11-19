package org.example.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.example.entities.Friend;

@ApplicationScoped
public class FriendRepository implements PanacheRepository<Friend> {
}
