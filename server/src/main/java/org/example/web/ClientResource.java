package org.example.web;

import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.example.dto.client.ClientDetailsDTO;
import org.example.dto.client.SecureClientDTO;
import org.example.dto.client.SocialClientDTO;
import org.example.entities.Client;
import org.example.mappers.ClientMapper;
import org.example.mappers.SecureMapper;
import org.example.mappers.SocialMapper;
import org.example.repositories.ClientRepository;

import java.util.List;

@Authenticated
@Path("/api/clients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ClientResource {

    @Inject
    ClientRepository repository;

    @GET
    public List<SecureClientDTO> getAll() {
        List<Client> clients = repository.listAll();
        return SecureMapper.toListSecureDto(clients);
    }

    @GET
    @Path("/{id}")
    public SocialClientDTO get(@PathParam("id") Long id) {
        Client client = repository.findById(id);
        return SocialMapper.toSocialDTO(client);
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
