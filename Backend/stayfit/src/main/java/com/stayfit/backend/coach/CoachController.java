package com.stayfit.backend.coach;

import com.stayfit.backend.coach.request.CoachInfoRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
