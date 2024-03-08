package com.stayfit.backend.user.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CredentialsRequest {
    private String currentPassword;
    private String newUsername;
    private String newPassword;
}
