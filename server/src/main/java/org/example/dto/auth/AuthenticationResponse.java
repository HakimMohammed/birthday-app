package org.example.dto.auth;

import org.example.dto.client.SecureClientDTO;

public record AuthenticationResponse(SecureClientDTO client, String token) {}

