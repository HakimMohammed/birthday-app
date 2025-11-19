package org.example.mappers;

import org.example.dto.client.SecureClientDTO;
import org.example.entities.Client;

/**
 * This Mapper is to convert Client to SecureClientDTO
 * The difference is that Client contains friends and password
 * while ClientDetailsDTO does not have neither friends nor password
 **/
public class SecureMapper {
    public static SecureClientDTO toSecureDto(Client user) {
        return new SecureClientDTO(user.id, user.name, user.email);
    }
}
