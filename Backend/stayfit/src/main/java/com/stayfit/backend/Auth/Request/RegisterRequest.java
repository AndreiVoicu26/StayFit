package com.stayfit.backend.Auth.Request;


import com.stayfit.backend.Customer.MembershipType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;
    private MembershipType membershipType;
}
