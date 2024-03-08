package com.stayfit.backend.customer.request;

import com.stayfit.backend.customer.MembershipType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BillingInfoRequest {
    private MembershipType membershipType;
    private LocalDate nextBillingDate;
}
