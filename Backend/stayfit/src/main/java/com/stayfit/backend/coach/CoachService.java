package com.stayfit.backend.coach;

import com.stayfit.backend.coach.request.CoachInfoRequest;
import com.stayfit.backend.customer.Customer;
import com.stayfit.backend.customer.CustomerRepository;
import com.stayfit.backend.customer.request.EventRequest;
import com.stayfit.backend.event.Event;
import com.stayfit.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CoachService {

    private final UserRepository userRepository;
    private final CoachRepository coachRepository;
    private final CustomerRepository customerRepository;


    public void updateCoachInfo(CoachInfoRequest info) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Coach coach = coachRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Coach with username " + username + " not found"));

        coach.setQualification(info.getQualification());
        coach.setDescription(info.getDescription());

        coachRepository.save(coach);
    }

    public CoachInfoRequest getCoachInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Coach coach = coachRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Coach with username " + username + " not found"));

        return CoachInfoRequest.builder()
                .qualification(coach.getQualification())
                .description(coach.getDescription())
                .build();
    }

    @Transactional
    public List<?> getCustomers() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Coach coach = coachRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Coach with username " + username + " not found"));

        if(coach.getCustomers() == null) {
            return Collections.emptyList();
        }

        List<Customer> customers = coach.getCustomers();
        List<Map<String, String>> users = new ArrayList<>();

        for (Customer customer : customers) {
            Map<String, String> user = Map.of(
                    "id", String.valueOf(customer.getId()),
                    "firstName", customer.getUser().getFirstName(),
                    "lastName", customer.getUser().getLastName(),
                    "profilePicture", customer.getUser().getProfilePicture() != null ?
                            Base64.getEncoder().encodeToString(customer.getUser().getProfilePicture()) : ""
                    );

            users.add(user);
        }
        return users;
    }

    public Map<String,?> getCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new RuntimeException("Customer with id " + id + " not found"));

        Map<String, String> user = Map.of(
                "id", String.valueOf(customer.getId()),
                "firstName", customer.getUser().getFirstName(),
                "lastName", customer.getUser().getLastName(),
                "email", customer.getUser().getEmail(),
                "phone", customer.getUser().getPhone() != null ? customer.getUser().getPhone() : "",
                "dateOfBirth", customer.getUser().getDateOfBirth() != null ? customer.getUser().getDateOfBirth().toString() : "",
                "profilePicture", customer.getUser().getProfilePicture() != null ?
                        Base64.getEncoder().encodeToString(customer.getUser().getProfilePicture()) : ""
        );

        return user;
    }

    public void createEvent(Long id, EventRequest event) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new RuntimeException("Customer with id " + id + " not found"));

        Event newEvent = Event.builder()
                .title(event.getTitle())
                .details(event.getDetails())
                .link(event.getLink())
                .isCancelled(false)
                .date(event.getDate())
                .build();

        newEvent.setCustomer(customer);
        customer.getEvents().add(newEvent);

        customerRepository.save(customer);
    }

    public List<?> getEvents(Long id) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new RuntimeException("Customer with id " + id + " not found"));

        if(customer.getEvents() == null) {
            return Collections.emptyList();
        }

        List<Event> events = customer.getEvents();
        List<Map<String, String>> response = new ArrayList<>();

        for (Event event : events) {
            Map<String, String> eventMap = Map.of(
                    "id", String.valueOf(event.getId()),
                    "title", event.getTitle(),
                    "details", event.getDetails() != null ? event.getDetails() : "",
                    "link", event.getLink() != null ? event.getLink() : "",
                    "date", event.getDate().toString(),
                    "isCancelled", String.valueOf(event.getIsCancelled())
            );

            response.add(eventMap);
        }

        return response;
    }

    public void updateEvent(Long id, Long eventId, EventRequest event) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new RuntimeException("Customer with id " + id + " not found"));

        Event updatedEvent = customer.getEvents().stream()
                .filter(e -> e.getId().equals(eventId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Event with id " + eventId + " not found"));

        updatedEvent.setTitle(event.getTitle());
        updatedEvent.setDetails(event.getDetails());
        updatedEvent.setLink(event.getLink());
        updatedEvent.setIsCancelled(event.getIsCancelled());

        customerRepository.save(customer);
    }
}
