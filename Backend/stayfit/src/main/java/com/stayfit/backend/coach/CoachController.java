package com.stayfit.backend.coach;

import com.stayfit.backend.coach.request.CoachInfoRequest;
import com.stayfit.backend.coach.request.TargetRequest;
import com.stayfit.backend.customer.request.EventRequest;
import com.stayfit.backend.customer.request.ExerciseRequest;
import com.stayfit.backend.customer.request.MealRequest;
import com.stayfit.backend.customer.request.WorkoutRequest;
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

    @DeleteMapping("/client/{id}/event/{eventId}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id, @PathVariable Long eventId) {
        coachService.deleteEvent(id, eventId);

        return ResponseEntity.ok("Event deleted successfully");
    }

    @PutMapping("/client/{id}/target")
    public ResponseEntity<?> updateTarget(@PathVariable Long id, @RequestBody TargetRequest target) {
        coachService.updateTarget(id, target);

        return ResponseEntity.ok("Target updated successfully");
    }

    @GetMapping("/client/{id}/records")
    public ResponseEntity<?> getRecords(@PathVariable Long id) {
        List<?> response = coachService.getRecords(id);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/client/{id}/workout")
    public ResponseEntity<?> addWorkout(@PathVariable Long id, @RequestBody WorkoutRequest workout) {
        coachService.createWorkout(id, workout);

        return ResponseEntity.ok("Workout added successfully");
    }

    @GetMapping("/client/{id}/workouts/{day}")
    public ResponseEntity<?> getWorkouts(@PathVariable Long id, @PathVariable String day) {
        List<?> response = coachService.getWorkouts(id, day);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/client/{id}/workout/{workoutId}")
    public ResponseEntity<?> updateWorkout(@PathVariable Long id, @PathVariable Long workoutId, @RequestBody WorkoutRequest workout) {
        coachService.updateWorkout(id, workoutId, workout);

        return ResponseEntity.ok("Workout updated successfully");
    }

    @DeleteMapping("/client/{id}/workout/{workoutId}")
    public ResponseEntity<?> deleteWorkout(@PathVariable Long id, @PathVariable Long workoutId) {
        coachService.deleteWorkout(id, workoutId);

        return ResponseEntity.ok("Workout deleted successfully");
    }

    @PostMapping("/client/{id}/workout/{workoutId}/exercise")
    public ResponseEntity<?> addExercise(@PathVariable Long id, @PathVariable Long workoutId, @RequestBody ExerciseRequest exercise) {
        coachService.addExercise(id, workoutId, exercise);

        return ResponseEntity.ok("Exercise added successfully");
    }

    @PutMapping("/client/{id}/workout/{workoutId}/exercise/{exerciseId}")
    public ResponseEntity<?> updateExercise(@PathVariable Long id, @PathVariable Long workoutId, @PathVariable Long exerciseId, @RequestBody ExerciseRequest exercise) {
        coachService.updateExercise(id, workoutId, exerciseId, exercise);

        return ResponseEntity.ok("Exercise updated successfully");
    }

    @DeleteMapping("/client/{id}/workout/{workoutId}/exercise/{exerciseId}")
    public ResponseEntity<?> deleteExercise(@PathVariable Long id, @PathVariable Long workoutId, @PathVariable Long exerciseId) {
        coachService.deleteExercise(id, workoutId, exerciseId);

        return ResponseEntity.ok("Exercise deleted successfully");
    }

    @PostMapping("/client/{id}/meal")
    public ResponseEntity<?> addMeal(@PathVariable Long id, @RequestBody MealRequest meal) {
        coachService.createMeal(id, meal);

        return ResponseEntity.ok("Meal added successfully");
    }

    @GetMapping("/client/{id}/meals/{day}")
    public ResponseEntity<?> getMeals(@PathVariable Long id, @PathVariable String day) {
        List<?> response = coachService.getMeals(id, day);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/client/{id}/meal/{mealId}")
    public ResponseEntity<?> updateMeal(@PathVariable Long id, @PathVariable Long mealId, @RequestBody MealRequest meal) {
        coachService.updateMeal(id, mealId, meal);

        return ResponseEntity.ok("Meal updated successfully");
    }

    @DeleteMapping("/client/{id}/meal/{mealId}")
    public ResponseEntity<?> deleteMeal(@PathVariable Long id, @PathVariable Long mealId) {
        coachService.deleteMeal(id, mealId);

        return ResponseEntity.ok("Meal deleted successfully");
    }

}
