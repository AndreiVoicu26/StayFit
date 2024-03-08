package com.stayfit.backend.customer;

import com.stayfit.backend.auth.request.PaymentRequest;
import com.stayfit.backend.customer.request.BillingInfoRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/profile")
    public ResponseEntity<?> getCustomerProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Map<String, ?> response = customerService.getCustomerProfile(username);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/billing")
    public ResponseEntity<?> getBillingInfo() {
        BillingInfoRequest response = customerService.getBillingInfo();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/billing")
    public ResponseEntity<?> changeMembership(@RequestBody PaymentRequest membershipType) {
        customerService.changeMembership(membershipType);

        return ResponseEntity.ok("Membership updated successfully!");
    }

    @PutMapping("/deactivate-account")
    public ResponseEntity<?> deactivateAccount(HttpServletRequest request, HttpServletResponse response) {
        customerService.deactivateAccount(request, response);

        return ResponseEntity.ok("Account deactivated successfully!");
    }

    @DeleteMapping("/account")
    public ResponseEntity<?> deleteAccount(HttpServletRequest request, HttpServletResponse response) {
        customerService.deleteAccount(request, response);

        return ResponseEntity.ok("Account deleted successfully");
    }

    @GetMapping("/check-oauth2-user")
    public ResponseEntity<?> checkIfOauth2User() {
        boolean response = customerService.checkIfOauth2User();

        return ResponseEntity.ok(response);
    }
}
