package org.example.services;

import io.quarkus.elytron.security.common.BcryptUtil;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import org.example.dto.auth.AuthenticationResponse;
import org.example.dto.auth.LoginRequest;
import org.example.dto.auth.RegisterRequest;
import org.example.dto.client.SecureClientDTO;
import org.example.entities.Client;
import org.example.mappers.auth.RequestMapper;
import org.example.mappers.client.SecureMapper;
import org.example.repositories.ClientRepository;
import java.util.Set;

@ApplicationScoped
public class AuthenticationService {

    @Inject
    ClientRepository repository;

    @Transactional
    public AuthenticationResponse register(RegisterRequest registerRequest) {

        // Check duplicate email
        if (repository.find("email", registerRequest.email()).firstResult() != null) {
            throw new WebApplicationException("Email already in use", 400);
        }

        // Hash password
        Client client = RequestMapper.registertoEntity(registerRequest);
        client.password = BcryptUtil.bcryptHash(registerRequest.password());

        // Persist
        repository.persist(client);

        return createAuthenticationResponse(client);
    }

    public AuthenticationResponse login(LoginRequest loginRequest) {
        Client client = repository.find("email", loginRequest.email()).firstResult();

        if (client == null ||
                !BcryptUtil.matches(loginRequest.password(), client.password)) {
            throw new WebApplicationException("Invalid credentials", 401);
        }

        return createAuthenticationResponse(client);
    }

    private AuthenticationResponse createAuthenticationResponse(Client client) {
        String token = Jwt.issuer("https://example.com/issuer")
                .groups(Set.of("Client"))
                .upn(client.email)
                .claim("id", client.id)
                .sign();

        SecureClientDTO secureClientDTO = SecureMapper.toSecureDto(client);

        return new AuthenticationResponse(secureClientDTO, token);
    }
}

