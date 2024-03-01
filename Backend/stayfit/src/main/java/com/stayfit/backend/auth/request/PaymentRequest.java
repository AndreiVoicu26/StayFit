package com.stayfit.backend.auth.request;


import com.stayfit.backend.customer.MembershipType;
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
