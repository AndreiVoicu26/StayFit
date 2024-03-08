package com.stayfit.backend.customer;

import com.stayfit.backend.auth.request.PaymentRequest;
import com.stayfit.backend.auth.util.CookieUtil;
import com.stayfit.backend.customer.request.BillingInfoRequest;
import com.stayfit.backend.exception.UserNotFoundException;
import com.stayfit.backend.user.User;
import com.stayfit.backend.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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


    public BillingInfoRequest getBillingInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer with username " + username + " not found"));

        return BillingInfoRequest.builder()
                .nextBillingDate(customer.getNextBillingDate())
                .membershipType(customer.getMembershipType())
                .build();
    }


    public void changeMembership(PaymentRequest membershipType) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer with username " + username + " not found"));

        if(customer.getNextBillingDate().minusWeeks(1).isAfter(LocalDate.now())) {
            throw new RuntimeException("You can only change your membership type at least 1 week before the next billing date");
        }

        customer.setMembershipType(membershipType.getMembershipType());
        customer.setNextBillingDate(LocalDate.now().plusMonths(membershipType.getMembershipType().getDurationMonths()));
        customerRepository.save(customer);
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void updateBillingDate() {
        customerRepository.findAll().forEach(customer -> {
            if(customer.getStatus().equals(Status.ACTIVE) && customer.getNextBillingDate().isEqual(LocalDate.now())) {
                customer.setNextBillingDate(LocalDate.now().plusMonths(customer.getMembershipType().getDurationMonths()));
                customerRepository.save(customer);
            }
        });
    }

    public void deactivateAccount(HttpServletRequest request, HttpServletResponse response) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer with username " + username + " not found"));

        customer.setStatus(Status.INACTIVE);
        customer.setMembershipType(null);
        customer.setNextBillingDate(null);
        customerRepository.save(customer);

        CookieUtil.clearCookies(request, response);
        SecurityContextHolder.clearContext();
    }

    public void deleteAccount(HttpServletRequest request, HttpServletResponse response) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));

        customerRepository.deleteByUser(user);
        userRepository.delete(user);

        CookieUtil.clearCookies(request, response);
        SecurityContextHolder.clearContext();
    }

    public boolean checkIfOauth2User() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));

        return user.getPassword() == null;
    }
}
