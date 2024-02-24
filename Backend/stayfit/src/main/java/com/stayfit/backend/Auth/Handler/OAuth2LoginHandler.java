package com.stayfit.backend.Auth.Handler;

import com.stayfit.backend.Auth.Util.CookieUtil;
import com.stayfit.backend.Auth.JwtService;
import com.stayfit.backend.Customer.Customer;
import com.stayfit.backend.Customer.CustomerRepository;
import com.stayfit.backend.Customer.Status;
import com.stayfit.backend.Exception.UserNotFoundException;
import com.stayfit.backend.User.Role;
import com.stayfit.backend.User.User;
import com.stayfit.backend.User.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Objects;

@RequiredArgsConstructor
public class OAuth2LoginHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException {
        String username;
        String firstName;
        String lastName;

        if (authentication.getPrincipal() instanceof OidcUser oidcUser) {
            username = oidcUser.getSubject();
            firstName = oidcUser.getGivenName();
            lastName = oidcUser.getFamilyName();
        } else if (authentication.getPrincipal() instanceof OAuth2User oAuth2User) {
            username = oAuth2User.getAttribute("id");
            firstName = Objects.requireNonNull(oAuth2User.getAttribute("name")).toString().split(" ")[0];
            lastName = Objects.requireNonNull(oAuth2User.getAttribute("name")).toString().split(" ")[1];
        } else {
            throw new RuntimeException("Unsupported OAuth2 user");
        }

        User user;

        if (userRepository.existsByUsername(username)) {
            user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));

            var customer = customerRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Customer " + username + " not found"));
            if(String.valueOf(customer.getStatus()).equals("INACTIVE")) {
                getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000/payment");
                return;
            }

            var accessToken = jwtService.generateAccessToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);

            CookieUtil.createCookie(response, "accessToken", accessToken, true);
            CookieUtil.createCookie(response, "refreshToken", refreshToken, true);

            getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000/dashboard");
        } else {
            user = User
                    .builder()
                    .firstName(firstName)
                    .lastName(lastName)
                    .username(username)
                    .role(Role.CUSTOMER)
                    .build();
            userRepository.save(user);

            var customer = Customer
                    .builder()
                    .user(user)
                    .status(Status.INACTIVE)
                    .build();
            customerRepository.save(customer);

            CookieUtil.createCookie(response, "userId", username, true);

            getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000/payment");
        }
    }
}
