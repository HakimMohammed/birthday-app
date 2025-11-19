package org.example.mappers;

import org.example.dto.client.ClientDetailsDTO;
import org.example.dto.client.SecureClientDTO;
import org.example.entities.Client;

import java.util.ArrayList;
import java.util.List;

/**
 * This Mapper is to convert Client to SecureClientDTO
 * The difference is that Client contains friends and password
 * while ClientDetailsDTO does not have neither friends nor password
 **/
public class SecureMapper {
    public static SecureClientDTO toSecureDto(Client user) {
        return new SecureClientDTO(user.id, user.name, user.email);
    }

    public static List<SecureClientDTO> toListSecureDto(List<Client> clients) {
        List<SecureClientDTO> secureList = new ArrayList<SecureClientDTO>();
        clients.forEach(client -> {
            secureList.add(toSecureDto(client));
        });
        return secureList;
    }
}
