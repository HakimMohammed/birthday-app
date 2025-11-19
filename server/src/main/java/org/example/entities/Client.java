package org.example.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Client extends PanacheEntity {

    @Column(nullable = false)
    public String name;
    @Column(nullable = false, unique = true)
    public String email;
    @Column(nullable = false)
    public String password;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<Friend> friends = new ArrayList<Friend>();

    public Client() {}

    public Client(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
