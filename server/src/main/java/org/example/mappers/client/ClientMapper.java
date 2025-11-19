package org.example.mappers.client;

import org.example.dto.client.ClientDetailsDTO;
import org.example.entities.Client;

import java.util.ArrayList;
import java.util.List;

/**
 * This Mapper is to convert Client to ClientDetailDTO
 * The difference is that Client contains friends
 * while ClientDetailsDTO does not
 **/
public class ClientMapper {

    public static ClientDetailsDTO toDetailsDto(Client user) {
        return new ClientDetailsDTO(user.id, user.name, user.email, user.password);
    }

    public static List<ClientDetailsDTO> toListDetailsDTO(List<Client> clients) {
        List<ClientDetailsDTO> detailsList = new ArrayList<ClientDetailsDTO>();
        clients.forEach(client -> {
            detailsList.add(toDetailsDto(client));
        });
        return detailsList;
    }

    public static Client toEntity(ClientDetailsDTO dto) {
        return new Client(dto.name(), dto.email(), dto.password());
    }
}
