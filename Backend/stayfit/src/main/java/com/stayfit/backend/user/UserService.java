package com.stayfit.backend.user;

import com.stayfit.backend.exception.UserNotFoundException;
import com.stayfit.backend.user.request.AccountInfoRequest;
import com.stayfit.backend.user.request.CredentialsRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@Service
@RequiredArgsConstructor
public class UserService implements Serializable {

    private final UserRepository userRepository;

    @Transactional
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

    @Transactional
    public void uploadProfilePicture(byte[] picture) throws IOException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));

        user.setProfilePicture(picture);
        userRepository.save(user);
    }

    @Transactional
    public byte[] getProfilePicture() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));

        return user.getProfilePicture();
    }

    public void deleteProfilePicture() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));

        user.setProfilePicture(null);
        userRepository.save(user);
    }


    public void updateUserInfo(AccountInfoRequest info) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));

        user.setFirstName(info.getFirstName());
        user.setLastName(info.getLastName());
        user.setEmail(info.getEmail());
        user.setPhone(info.getPhone());
        user.setDateOfBirth(info.getDateOfBirth());

        userRepository.save(user);
    }

    public AccountInfoRequest getUserInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));

        return AccountInfoRequest.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .dateOfBirth(user.getDateOfBirth())
                .build();
    }
}
