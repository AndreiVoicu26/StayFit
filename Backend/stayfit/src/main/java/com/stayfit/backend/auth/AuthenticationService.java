package com.stayfit.backend.auth;

import com.stayfit.backend.auth.request.*;
import com.stayfit.backend.auth.util.CookieUtil;
import com.stayfit.backend.customer.Customer;
import com.stayfit.backend.customer.CustomerRepository;
import com.stayfit.backend.customer.Status;
import com.stayfit.backend.exception.*;
import com.stayfit.backend.user.Role;
import com.stayfit.backend.user.User;
import com.stayfit.backend.user.UserRepository;
import com.stayfit.backend.user.UserService;
import com.stayfit.backend.user.request.CredentialsRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final JavaMailSender mailSender;

    public void register(RegisterRequest request, HttpServletResponse response) {
        var user = User
                .builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .role(Role.CUSTOMER)
                .build();

        if (userRepository.existsByEmail(user.getUsername())) {
            throw new UserAlreadyExistsException("A user with username " + user.getUsername() + " already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException("A user with email " + user.getEmail() + " already exists");
        }
        var savedUser = userRepository.save(user);

        var customer = Customer
                .builder()
                .user(savedUser)
                .status(Status.INACTIVE)
                .build();
        customerRepository.save(customer);

        CookieUtil.createCookie(response, "userId", request.getUsername(), true);
    }

    public Map<String, String> login(LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        var user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User with username " + loginRequest.getUsername() + " not found"));

        var accessToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        CookieUtil.createCookie(response, "accessToken", accessToken, true);
        CookieUtil.createCookie(response, "refreshToken", refreshToken, true);

        if (user.getRole().equals(Role.CUSTOMER)) {
            var customer = customerRepository.findByUser(user)
                    .orElseThrow(() -> new CustomerNotFoundException("Customer with username " + user.getUsername() + " not found"));
            if (customer.getStatus().equals(Status.INACTIVE) && !CookieUtil.exists(request, "userId") ){
                CookieUtil.createCookie(response, "userId", loginRequest.getUsername(), true);
            }
            return Map.of("role", Role.CUSTOMER.toString(), "status", String.valueOf(customer.getStatus()));
        } else {
            return Map.of("role", user.getRole().toString(), "status", "");
        }
    }

    public void payment(PaymentRequest paymentRequest, HttpServletRequest request, HttpServletResponse response) {
        var username = CookieUtil.getCookieValue(request, "userId");

        if (username == null) {
            throw new InvalidTokenException("userId token missing or invalid");
        }

        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));
        var customer = customerRepository.findByUser(user)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with username " + username + " not found"));

        if (String.valueOf(customer.getStatus()).equals("ACTIVE") && customer.getNextBillingDate().isBefore(LocalDate.now())) {
            throw new AccountAlreadyActiveException("Account is already active");
        }

        LocalDate nextBillingDate = LocalDate.now().plusMonths(paymentRequest.getMembershipType().getDurationMonths());
        customer.setMembershipType(paymentRequest.getMembershipType());
        customer.setNextBillingDate(nextBillingDate);
        customer.setStatus(Status.ACTIVE);
        customerRepository.save(customer);

        var accessToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        CookieUtil.createCookie(response, "accessToken", accessToken, true);
        CookieUtil.createCookie(response, "refreshToken", refreshToken, true);
        CookieUtil.clearCookie(response, "userId");

        UserDetails userDetails = userService.userDetailsService().loadUserByUsername(username);
        if (jwtService.isTokenValid(accessToken, userDetails)) {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }

    public void checkIfUserLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
            throw new UserAlreadyLoggedInException("Operation not allowed: User is already logged in");
        }
    }

    public Map<String, Object> checkAuthenticationState(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> response = new HashMap<>();

        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            response.put("authenticated", authentication.isAuthenticated());
            response.put("role", userService.getRoleFromAuthentication(authentication));
            response.put("expired", jwtService.isTokenExpiringSoon(CookieUtil.getCookieValue(request, "accessToken")));
        } else {
            response.put("authenticated", false);
            response.put("role", "");
        }

        return response;
    }

    public Status getCustomerStatus(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            if (authentication instanceof AnonymousAuthenticationToken) {
                if (CookieUtil.getCookieValue(request, "userId") != null) {
                    return Status.INACTIVE;
                } else {
                    return null;
                }
            } else {
                String username = authentication.getName();
                User user = userRepository.findByUsername(username)
                        .orElseThrow(() -> new UserNotFoundException("User " + username + " not found"));

                if(customerRepository.existsByUser(user)) {
                    Customer customer = customerRepository.findByUser(user)
                            .orElseThrow(() -> new CustomerNotFoundException("Customer " + username + " not found"));

                    return customer.getStatus();
                } else {
                    return null;
                }
            }
        } else {
            return null;
        }
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) {
        var refreshToken = CookieUtil.getCookieValue(request, "refreshToken");
        if (refreshToken == null || refreshToken.isEmpty() || !jwtService.isRefreshToken(refreshToken)) {
            throw new InvalidTokenException("Refresh token is missing or invalid");
        }

        var username = jwtService.extractUsername(refreshToken);
        if (username == null) {
            throw new InvalidTokenException("Invalid refresh token");
        }

        var user = userService.userDetailsService().loadUserByUsername(username);

        if (!jwtService.isTokenValid(refreshToken, user)) {
            throw new InvalidTokenException("Refresh token is expired or invalid");
        }

        var accessToken = jwtService.generateAccessToken(user);
        CookieUtil.createCookie(response, "accessToken", accessToken, true);
    }

    public void sendPasswordResetEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found"));

        String token = UUID.randomUUID().toString();

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.HOUR, 24);

        user.setResetPasswordToken(token);
        user.setResetPasswordTokenExpiry(cal.getTime());
        userRepository.save(user);

        String resetUrl = "http://localhost:3000/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("andreivoicu80@gmail.com");
        message.setTo(email);
        message.setSubject("StayFit Password Reset");
        message.setText("To reset your password, click the link below:\n\n" + resetUrl +
                "\n\nIf you did not request a password reset, please ignore this email.");

        mailSender.send(message);
    }

    public boolean resetPassword(PasswordResetRequest request) {
        User user = userRepository.findByResetPasswordToken(request.getToken())
                .orElseThrow(() -> new UserNotFoundException("User with token " + request.getToken() + " not found"));

        if (user.getResetPasswordTokenExpiry().before(new Date())) {
            return false;
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(encodedPassword);

        user.setResetPasswordToken(null);
        user.setResetPasswordTokenExpiry(null);

        userRepository.save(user);

        return true;
    }

    public boolean updateCredentials(CredentialsRequest credentials, HttpServletRequest request, HttpServletResponse response) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        credentials.getCurrentPassword()
                )
        );

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));

        if(!credentials.getNewUsername().isEmpty()) {
            user.setUsername(credentials.getNewUsername());
        }

        if(!credentials.getNewPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(credentials.getNewPassword()));
        }

        userRepository.save(user);

        CookieUtil.clearCookies(request, response);
        SecurityContextHolder.clearContext();

        return true;
    }

    public void sendEmail(EmailRequest email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("andreivoicu80@gmail.com");
        message.setTo("andreivoicu80@gmail.com");
        message.setReplyTo(email.getEmail());
        message.setSubject(email.getSubject());
        message.setText("From: " + email.getName() + "\n" + email.getMessage());

        mailSender.send(message);
    }
}
