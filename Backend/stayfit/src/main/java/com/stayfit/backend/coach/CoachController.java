package com.stayfit.backend.coach;

import com.stayfit.backend.coach.request.CoachInfoRequest;
import com.stayfit.backend.customer.request.EventRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/coach")
@RequiredArgsConstructor
public class CoachController {

    private final CoachService coachService;

    @PutMapping("/info")
    public ResponseEntity<?> updateCoachInfo(@RequestBody CoachInfoRequest info) {
        coachService.updateCoachInfo(info);

        return ResponseEntity.ok("Coach info updated successfully");
    }

    @GetMapping("/info")
    public ResponseEntity<?> getCoachInfo() {
        CoachInfoRequest response = coachService.getCoachInfo();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/clients")
    public ResponseEntity<?> getCustomers() {
        List<?> response = coachService.getCustomers();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable Long id) {
        Map<String, ?> response = coachService.getCustomer(id);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/client/{id}/event")
    public ResponseEntity<?> createEvent(@PathVariable Long id, @RequestBody EventRequest event) {
        coachService.createEvent(id, event);

        return ResponseEntity.ok("Event created successfully");
    }

    @GetMapping("/client/{id}/events")
    public ResponseEntity<?> getEvents(@PathVariable Long id) {
        List<?> response = coachService.getEvents(id);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/client/{id}/event/{eventId}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @PathVariable Long eventId, @RequestBody EventRequest event) {
        coachService.updateEvent(id, eventId, event);

        return ResponseEntity.ok("Event updated successfully");
    }
}
