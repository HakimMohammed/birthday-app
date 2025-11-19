package org.example.mappers;

import org.example.dto.ClientDTO;
import org.example.entities.Client;


public class ClientMapper {

    public static ClientDTO toDto(Client user) {
        ClientDTO dto = new ClientDTO();
        dto.setId(user.id);
        dto.setEmail(user.email);
        dto.setPassword(user.password);
        return dto;
    }

    public static Client toEntity(ClientDTO dto) {
        return new Client(dto.getName(), dto.getEmail(), dto.getPassword());
    }
}
