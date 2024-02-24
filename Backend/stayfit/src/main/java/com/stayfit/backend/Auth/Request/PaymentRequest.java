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
public class PaymentRequest {

    private MembershipType membershipType;
}
