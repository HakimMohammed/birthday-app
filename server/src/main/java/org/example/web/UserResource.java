package org.example.web;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.example.entities.User;
import org.example.repositories.UserRepository;

import java.util.List;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UserRepository repository;

    @GET
    public List<User> getAll() {
        return repository.listAll();
    }

    @GET
    @Path("/{id}")
    public User get(@PathParam("id") Long id) {
        return repository.findById(id);
    }

    @POST
    @Transactional
    public User create(User user) {
        repository.persist(user);
        return user;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public User update(@PathParam("id") Long id, User updated) {
        User existing = repository.findById(id);
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
