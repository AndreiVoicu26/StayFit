package com.stayfit.backend.sysadmin;

import com.stayfit.backend.coach.Coach;
import com.stayfit.backend.coach.CoachRepository;
import com.stayfit.backend.customer.Customer;
import com.stayfit.backend.customer.CustomerRepository;
import com.stayfit.backend.customer.Status;
import com.stayfit.backend.exception.CoachNotFoundException;
import com.stayfit.backend.exception.CustomerNotFoundException;
import com.stayfit.backend.exception.UserAlreadyExistsException;
import com.stayfit.backend.sysadmin.request.RegisterCoachRequest;
import com.stayfit.backend.user.Role;
import com.stayfit.backend.user.User;
import com.stayfit.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SysAdminService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final CoachRepository coachRepository;
    private final CustomerRepository customerRepository;

    public void registerCoach(RegisterCoachRequest request) {
        var user = User
                .builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .role(Role.COACH)
                .build();

        if (userRepository.existsByEmail(user.getUsername())) {
            throw new UserAlreadyExistsException("A user with username " + user.getUsername() + " already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException("A user with email " + user.getEmail() + " already exists");
        }
        var savedUser = userRepository.save(user);

        var coach = Coach
                .builder()
                .user(savedUser)
                .qualification(request.getQualification())
                .build();
        coachRepository.save(coach);
    }

    @Transactional
    public List<?> getCoaches() {
         List<Coach> coaches = coachRepository.findAll();
         List<Map<String, String>> users = new ArrayList<>(Collections.emptyList());

         for (Coach coach : coaches) {
             Map<String, String> user = Map.of(
                     "id", String.valueOf(coach.getId()),
                     "firstName", coach.getUser().getFirstName(),
                     "lastName", coach.getUser().getLastName(),
                     "qualification", coach.getQualification(),
                     "email", coach.getUser().getEmail(),
                     "phone", coach.getUser().getPhone() != null ? coach.getUser().getPhone() : "",
                     "hasClients", String.valueOf(!coach.getCustomers().isEmpty())
             );

             users.add(user);
         }

         return users;
    }

    public void deleteCoach(Long id) {
        Coach coach = coachRepository.findById(id)
                .orElseThrow(() -> new CoachNotFoundException("Coach with id " + id + " not found"));

        coachRepository.deleteById(id);
        userRepository.deleteById(coach.getUser().getId());
    }

    public List<?> getCustomers() {
        List<Customer> customers = customerRepository.findAll();
        List<Map<String, String>> users = new ArrayList<>(Collections.emptyList());

        for (Customer customer : customers) {
            Map<String, String> user = Map.of(
                    "id", String.valueOf(customer.getId()),
                    "firstName", customer.getUser().getFirstName(),
                    "lastName", customer.getUser().getLastName(),
                    "status", customer.getStatus().toString(),
                    "email", customer.getUser().getEmail(),
                    "phone", customer.getUser().getPhone() != null ? customer.getUser().getPhone() : ""
            );

            users.add(user);
        }

        return users;
    }

    public void deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        customerRepository.deleteById(id);
        userRepository.deleteById(customer.getUser().getId());
    }

    public void deactivateCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        customer.setStatus(Status.INACTIVE);
        customer.setMembershipType(null);
        customer.setNextBillingDate(null);
        customer.setTargetWeight(null);
        customer.setTargetWorkout(null);
        customer.setTargetCalories(null);
        customer.getWorkouts().clear();
        customer.getMeals().clear();

        customerRepository.save(customer);
    }
}
