package org.example.mappers.friend;

import org.example.dto.friend.FriendDTO;
import org.example.entities.Friend;

/**
 * This Mapper is to convert Friend to FriendDTO
 * The difference is that Friend contains client
 * while FriendDTO does not
 **/
public class FriendMapper {

    public static FriendDTO toDto(Friend friend) {
        return new FriendDTO(friend.firstName, friend.lastName, friend.birthDate);
    }

}
