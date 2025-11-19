package org.example.dto.friend;

import java.time.LocalDate;

public record UpdateFriendDTO(Long id, String firstName, String lastName, LocalDate birthDate) {
}
