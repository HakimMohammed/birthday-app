package org.example.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.example.entities.Friend;

import java.util.List;

@ApplicationScoped
public class FriendRepository implements PanacheRepository<Friend> {
    public List<Friend> findByClientId(Long clientId) {
        return list("client.id", clientId);
    }
}
