package com.stayfit.backend.sysadmin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterCoachRequest {
    private String firstName;
    private String lastName;
    private String qualification;
    private String email;
    private String username;
    private String password;
}
