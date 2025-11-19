package org.example.dto.client;

import org.example.entities.Friend;

import java.util.List;

/**
 * This is a DTO to represnt a client with friends but without password
 */
public record SocialClientDTO(Long id, String name, String email, List<Friend> friends) {
}
