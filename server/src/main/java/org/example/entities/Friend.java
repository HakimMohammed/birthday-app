package org.example.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;

@Entity
public class Friend extends PanacheEntity {
    public String firstName;
    public String lastName;
    public Date birthDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    public User user;
}
