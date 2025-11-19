package org.example.mappers;

import org.example.dto.client.ClientDetailsDTO;
import org.example.dto.client.SocialClientDTO;
import org.example.entities.Client;

import java.util.ArrayList;
import java.util.List;

/**
 * This Mapper is to convert Client to SocialClientDTO
 * The difference is that Client contains password
 * while SocialClientDTO does not
 **/
public class SocialMapper {

    public static SocialClientDTO toSocialDTO(Client user) {
        return new SocialClientDTO(user.id, user.name, user.email, user.friends);
    }

    public static List<SocialClientDTO> toListSocialDTO(List<Client> clients) {
        List<SocialClientDTO> socialList = new ArrayList<SocialClientDTO>();
        clients.forEach(client -> {
            socialList.add(toSocialDTO(client));
        });
        return socialList;
    }
}
