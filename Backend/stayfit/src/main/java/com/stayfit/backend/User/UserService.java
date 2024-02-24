package com.stayfit.backend.User;

import com.stayfit.backend.Exception.UserNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));
    }

    public String getRoleFromAuthentication(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .map(grantedAuthority -> {
                    String roleWithoutPrefix = grantedAuthority.getAuthority().replace("ROLE_", "");
                    try {
                        Role.valueOf(roleWithoutPrefix);
                        return roleWithoutPrefix;
                    } catch (IllegalArgumentException e) {
                        return null;
                    }
                })
                .filter(role -> role != null)
                .findFirst()
                .orElse(null);
    }

    public boolean isEmailAvailable(String email) {
        return !userRepository.existsByEmail(email);
    }

    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }
}
