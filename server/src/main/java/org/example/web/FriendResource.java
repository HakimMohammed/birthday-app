package org.example.web;

import io.quarkus.security.Authenticated;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.example.dto.friend.FriendDTO;
import org.example.dto.friend.UpdateFriendDTO;
import org.example.entities.Friend;
import org.example.repositories.ClientRepository;
import org.example.repositories.FriendRepository;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@Authenticated
@Path("/api/friends")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class FriendResource {

    @Inject
    FriendRepository friendRepository;

    @Inject
    ClientRepository clientRepository;

    @Inject
    @Claim("id")
    Long userId;

    @GET
    public List<Friend> getAll() {
        return friendRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Response get(@PathParam("id") Long id) {
        Optional<Friend> friend = friendRepository.findByIdOptional(id);

        if (friend.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(friend.get()).build();
    }

    @POST
    @Transactional
    public Response create(FriendDTO dto) {
        Friend friend = new Friend(dto.firstName(), dto.lastName(), dto.birthDate(), clientRepository.findById(userId));

        friendRepository.persist(friend);

        return Response.created(URI.create("/api/friends/" + friend.id))
                .entity(dto)
                .build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, UpdateFriendDTO dto) {
        if (dto.id() != null && !id.equals(dto.id())) {
            return Response.status(Response.Status.BAD_REQUEST).entity("ID in path must match entity ID.").build();
        }

        Friend existing = friendRepository.findById(id);

        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        existing.firstName = dto.firstName();
        existing.lastName = dto.lastName();
        existing.birthDate = dto.birthDate();

        return Response.ok(existing).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = friendRepository.deleteById(id);

        if (deleted) {
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

}
