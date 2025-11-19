package org.example.mappers;

import org.example.dto.auth.LoginRequest;
import org.example.dto.auth.RegisterRequest;
import org.example.entities.Client;

public class RequestMapper {
    public static Client registertoEntity(RegisterRequest registerRequest) {
        Client client = new Client();
        client.name = registerRequest.name();
        client.email = registerRequest.email();
        return client;
    }
}
