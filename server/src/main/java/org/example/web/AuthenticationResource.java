package org.example.web;

import io.smallrye.jwt.build.Jwt;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.dto.LoginRequest;
import org.example.dto.RegisterRequest;
import org.example.entities.Client;
import org.example.repositories.ClientRepository;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthenticationResource {

    @Inject
    ClientRepository repository;

    @POST
    @Path("/login")
    @Transactional
    public Response login(LoginRequest request) {
        Client client = repository.find("email", request.email).firstResult();

        if (client == null || !client.password.equals(request.password)) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Invalid credentials").build();
        }

        String token = Jwt.issuer("https://example.com/issuer")
                .groups(new HashSet<>(List.of("Client")))
                .upn(client.email)
                .claim("id", client.id)
                .sign();

        return Response.ok("{\"token\":\"" + token + "\"}").build();
    }

    @POST
    @Path("/register")
    @Transactional
    public Response register(RegisterRequest request) {
        Client client = new Client(request.name, request.email, request.password);
        repository.persist(client);

        String token = Jwt.issuer("https://example.com/issuer")
                .groups(new HashSet<>(List.of("Client")))
                .upn(client.email)
                .claim("id", client.id)
                .sign();

        return Response.ok("{\"token\":\"" + token + "\"}").build();
    };

}
