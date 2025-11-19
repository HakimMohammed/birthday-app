package org.example.web;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.example.dto.ClientDTO;
import org.example.entities.Client;
import org.example.mappers.ClientMapper;
import org.example.repositories.ClientRepository;

import java.util.List;

@Path("/clients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RolesAllowed({"Client"})
public class ClientResource {

    @Inject
    ClientRepository repository;

    @GET
    public List<Client> getAll() {
        return repository.listAll();
    }

    @GET
    @Path("/{id}")
    public Client get(@PathParam("id") Long id) {
        return repository.findById(id);
    }

    @POST
    @Transactional
    public Client create(ClientDTO dto) {
        Client client = ClientMapper.toEntity(dto);
        repository.persist(client);
        return client;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Client update(@PathParam("id") Long id, Client updated) {
        Client existing = repository.findById(id);
        if (existing == null) throw new NotFoundException();
//        existing.name = updated.name;
//        existing.age = updated.age;
        return existing;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        repository.deleteById(id);
    }

}
