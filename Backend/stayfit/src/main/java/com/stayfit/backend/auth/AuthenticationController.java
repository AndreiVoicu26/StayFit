package com.stayfit.backend.auth;

import com.stayfit.backend.auth.request.*;
import com.stayfit.backend.customer.Status;
import com.stayfit.backend.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request, HttpServletResponse response) {
        authenticationService.checkIfUserLoggedIn();

        authenticationService.register(request, response);

        return ResponseEntity.ok().body("User has registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
        authenticationService.checkIfUserLoggedIn();

        Map<String, String> res = authenticationService.login(loginRequest, request, response);

        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/payment")
    public ResponseEntity<?> payment(@RequestBody PaymentRequest paymentRequest, HttpServletRequest request, HttpServletResponse response) {
        authenticationService.payment(paymentRequest, request, response);

        return ResponseEntity.ok().body("Payment has completed successfully and account has been activated");
    }

    @GetMapping("/check-authentication")
    public ResponseEntity<?> isAuthenticated(HttpServletRequest request) {
        Map<String, Object> res = authenticationService.checkAuthenticationState(request);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/check-status")
    public ResponseEntity<?> isCustomerActive(HttpServletRequest request) {
        Status res = authenticationService.getCustomerStatus(request);

        return ResponseEntity.ok(res);
    }


    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmailAvailability(@RequestParam String email) {
        boolean isAvailable = userService.isEmailAvailable(email);

        return ResponseEntity.ok(Map.of("isEmailAvailable", isAvailable));
    }

    @GetMapping("/check-username")
    public ResponseEntity<?> checkUsernameAvailability(@RequestParam String username) {
        boolean isAvailable = userService.isUsernameAvailable(username);

        return ResponseEntity.ok(Map.of("isUsernameAvailable", isAvailable));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        authenticationService.refreshToken(request, response);

        return ResponseEntity.ok().body("Access token has been refreshed successfully");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        authenticationService.sendPasswordResetEmail(email);

        return ResponseEntity.ok("Password reset email has been sent");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest request) {
        boolean resetSuccess = authenticationService.resetPassword(request);

        if (resetSuccess) {
            return ResponseEntity.ok("Password has been successfully reset.");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest email) {
        authenticationService.sendEmail(email);

        return ResponseEntity.ok("Email has been sent successfully");
    }
}
