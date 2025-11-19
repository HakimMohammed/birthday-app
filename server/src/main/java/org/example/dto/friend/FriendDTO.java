package org.example.dto.friend;

import java.time.LocalDate;

/**
 * This is a DTO to represent a friend
 * It does not contain client information
 */
    public record FriendDTO(String firstName, String lastName, LocalDate birthDate) {
}