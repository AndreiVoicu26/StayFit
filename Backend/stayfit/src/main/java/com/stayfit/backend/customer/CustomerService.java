package com.stayfit.backend.customer;

import com.stayfit.backend.auth.request.PaymentRequest;
import com.stayfit.backend.auth.util.CookieUtil;
import com.stayfit.backend.coach.Coach;
import com.stayfit.backend.coach.CoachRepository;
import com.stayfit.backend.customer.request.BillingInfoRequest;
import com.stayfit.backend.customer.request.EventRequest;
import com.stayfit.backend.customer.request.RecordRequest;
import com.stayfit.backend.event.Event;
import com.stayfit.backend.exception.UserNotFoundException;
import com.stayfit.backend.record.Record;
import com.stayfit.backend.record.RecordRepository;
import com.stayfit.backend.user.User;
import com.stayfit.backend.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final CoachRepository coachRepository;
    private final RecordRepository recordRepository;

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
                    "profilePicture", coach.getUser().getProfilePicture() != null ?
                            Base64.getEncoder().encodeToString(coach.getUser().getProfilePicture()) : "",
                    "description", coach.getDescription() != null ? coach.getDescription() : ""
            );

            users.add(user);
        }

        return users;
    }

    public void saveCoach(Long coachId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer with username " + username + " not found"));

        Coach coach = coachRepository.findById(coachId)
                .orElseThrow(() -> new RuntimeException("Coach with id " + coachId + " not found"));

        customer.setCoach(coach);
        customerRepository.save(customer);
    }

    public Map<String,?> getCoach() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer with username " + username + " not found"));

        if(customer.getCoach() == null) {
            return Collections.emptyMap();
        }

        Map<String, String> user = Map.of(
                "id", String.valueOf(customer.getCoach().getId()),
                "firstName", customer.getCoach().getUser().getFirstName(),
                "lastName", customer.getCoach().getUser().getLastName(),
                "qualification", customer.getCoach().getQualification(),
                "email", customer.getCoach().getUser().getEmail(),
                "phone", customer.getCoach().getUser().getPhone() != null ? customer.getCoach().getUser().getPhone() : "",
                "profilePicture", customer.getCoach().getUser().getProfilePicture() != null ?
                        Base64.getEncoder().encodeToString(customer.getCoach().getUser().getProfilePicture()) : "",
                "description", customer.getCoach().getDescription() != null ? customer.getCoach().getDescription() : ""
        );

        return user;
    }

    public void removeCoach() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer with username " + username + " not found"));

        customer.setCoach(null);
        customerRepository.save(customer);
    }

    public Map<String, ?> getProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User " + username + " not found"));

        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer with username " + username + " not found"));

        Map<String, String> profile = Map.of(
                "id", String.valueOf(user.getId()),
                "firstName", user.getFirstName(),
                "lastName", user.getLastName(),
                "email", user.getEmail(),
                "phone", user.getPhone() != null ? user.getPhone() : "",
                "profilePicture", user.getProfilePicture() != null ?
                        Base64.getEncoder().encodeToString(user.getProfilePicture()) : "",
                "targetWeight", customer.getTargetWeight() != null ?
                        String.valueOf(customer.getTargetWeight()) : "",
                "targetWorkout", customer.getTargetWorkout() != null ?
                        String.valueOf(customer.getTargetWorkout()) : "",
                "targetCalories", customer.getTargetCalories() != null ?
                        String.valueOf(customer.getTargetCalories()) : ""
        );

        return profile;
    }

    public void createEvent(EventRequest event) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer with username " + username + " not found"));

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


    public List<?> getEvents() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer with username " + username + " not found"));

        if(customer.getEvents() == null) {
            return Collections.emptyList();
        }

        List<Event> events = customer.getEvents();
        List<Map<String, String>> response = new ArrayList<>();

        for (Event event : events) {
            Map<String, String> eventMap = Map.of(
                    "id", String.valueOf(event.getId()),
                    "title", event.getTitle(),
                    "details", event.getDetails(),
                    "link", event.getLink() != null ? event.getLink() : "",
                    "date", event.getDate().toString(),
                    "isCancelled", String.valueOf(event.getIsCancelled())

            );

            response.add(eventMap);
        }

        return response;
    }

    public void updateEvent(Long eventId, EventRequest event) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer with username " + username + " not found"));

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

    public void createRecord(RecordRequest record) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer with username " + username + " not found"));

        if(recordRepository.existsByDate(record.getDate())) {
            Record existingRecord = recordRepository.findByDate(record.getDate())
                    .orElseThrow(() -> new RuntimeException("Record with date " + record.getDate() + " not found"));

            existingRecord.setWeight(record.getWeight());
            existingRecord.setCalories(record.getCalories());
            existingRecord.setWorkout(record.getWorkout());

            recordRepository.save(existingRecord);
        } else {
            Record newRecord = Record.builder()
                    .date(record.getDate())
                    .weight(record.getWeight())
                    .calories(record.getCalories())
                    .workout(record.getWorkout())
                    .build();

            newRecord.setCustomer(customer);
            customer.getRecords().add(newRecord);
        }

        customerRepository.save(customer);
    }

    public List<?> getRecords() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer with username " + username + " not found"));

        if(customer.getRecords() == null) {
            return Collections.emptyList();
        }

        List<Record> records = customer.getRecords();
        List<Map<String, String>> response = new ArrayList<>();

        for (Record record : records) {
            Map<String, String> recordMap = Map.of(
                    "id", String.valueOf(record.getId()),
                    "date", record.getDate().toString(),
                    "weight", record.getWeight().toString(),
                    "calories", record.getCalories().toString(),
                    "workout", record.getWorkout().toString()
            );

            response.add(recordMap);
        }

        return response;
    }
}
