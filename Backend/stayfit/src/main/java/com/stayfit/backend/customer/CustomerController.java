package com.stayfit.backend.customer;

import com.stayfit.backend.auth.request.PaymentRequest;
import com.stayfit.backend.coach.Coach;
import com.stayfit.backend.customer.request.BillingInfoRequest;
import com.stayfit.backend.customer.request.EventRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

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

    @GetMapping("/coaches")
    public ResponseEntity<?> getCoaches() {
        List<?> response = customerService.getCoaches();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/coaches/{coachId}")
    public ResponseEntity<?> chooseCoach(@PathVariable Long coachId) {
        customerService.saveCoach(coachId);

        return ResponseEntity.ok("Coach chosen successfully!");
    }

    @GetMapping("/coach")
    public ResponseEntity<?> getCoach() {
        Map<String, ?> response = customerService.getCoach();

        if(response.isEmpty()) {
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/coach")
    public ResponseEntity<?> removeCoach() {
        customerService.removeCoach();

        return ResponseEntity.ok("Coach removed successfully!");
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Map<String, ?> response = customerService.getProfile(username);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/event")
    public ResponseEntity<?> createEvent(@RequestBody EventRequest event) {
        customerService.createEvent(event);

        return ResponseEntity.ok("Event created successfully");
    }

    @GetMapping("/events")
    public ResponseEntity<?> getEvents() {
        List<?> response = customerService.getEvents();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/event/{eventId}")
    public ResponseEntity<?> updateEvent(@PathVariable Long eventId, @RequestBody EventRequest event) {
        customerService.updateEvent(eventId, event);

        return ResponseEntity.ok("Event updated successfully");
    }
}
