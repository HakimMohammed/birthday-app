package org.example.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Friend extends PanacheEntity {

    @Column(nullable = false)
    public String firstName;

    @Column(nullable = false)
    public String lastName;

    @Column(nullable = false)
    public LocalDate birthDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    public Client client;

    public Friend() {}

    public Friend(String firstName, String lastName, LocalDate birthDate, Client client) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.client = client;
    }
}
