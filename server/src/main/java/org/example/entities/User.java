package org.example.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class User extends PanacheEntity {
    public String name;
    public String email;
    public String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    public List<Friend> friends;
}
