package com.stayfit.backend.Customer;

import com.stayfit.backend.User.User;
import com.stayfit.backend.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    public Map<String, Object> getCustomerProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User " + username + " not found"));

        Map<String, Object> profile = new HashMap<>();
        profile.put("firstName", user.getFirstName());
        profile.put("lastName", user.getLastName());
        profile.put("profilePicture", user.getProfilePicture());

        return profile;
    }
}
