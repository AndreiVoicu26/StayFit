package com.stayfit.backend.coach;

import com.stayfit.backend.coach.request.CoachInfoRequest;
import com.stayfit.backend.coach.request.TargetRequest;
import com.stayfit.backend.customer.Customer;
import com.stayfit.backend.customer.CustomerRepository;
import com.stayfit.backend.customer.request.EventRequest;
import com.stayfit.backend.customer.request.ExerciseRequest;
import com.stayfit.backend.customer.request.MealRequest;
import com.stayfit.backend.customer.request.WorkoutRequest;
import com.stayfit.backend.event.Event;
import com.stayfit.backend.exception.*;
import com.stayfit.backend.nutrition.Meal;
import com.stayfit.backend.record.Record;
import com.stayfit.backend.user.UserRepository;
import com.stayfit.backend.workout.Exercise;
import com.stayfit.backend.workout.Workout;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoachService {

    private final CoachRepository coachRepository;
    private final CustomerRepository customerRepository;

    public void updateCoachInfo(CoachInfoRequest info) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Coach coach = coachRepository.findByUserUsername(username)
                .orElseThrow(() -> new CoachNotFoundException("Coach with username " + username + " not found"));

        coach.setQualification(info.getQualification());
        coach.setDescription(info.getDescription());

        coachRepository.save(coach);
    }

    public CoachInfoRequest getCoachInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Coach coach = coachRepository.findByUserUsername(username)
                .orElseThrow(() -> new CoachNotFoundException("Coach with username " + username + " not found"));

        return CoachInfoRequest.builder()
                .qualification(coach.getQualification())
                .description(coach.getDescription())
                .build();
    }

    @Transactional
    public List<?> getCustomers() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Coach coach = coachRepository.findByUserUsername(username)
                .orElseThrow(() -> new CoachNotFoundException("Coach with username " + username + " not found"));

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
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        Map<String, String> user = Map.of(
                "id", String.valueOf(customer.getId()),
                "firstName", customer.getUser().getFirstName(),
                "lastName", customer.getUser().getLastName(),
                "email", customer.getUser().getEmail(),
                "phone", customer.getUser().getPhone() != null ? customer.getUser().getPhone() : "",
                "dateOfBirth", customer.getUser().getDateOfBirth() != null ? customer.getUser().getDateOfBirth().toString() : "",
                "profilePicture", customer.getUser().getProfilePicture() != null ?
                        Base64.getEncoder().encodeToString(customer.getUser().getProfilePicture()) : "",
                "targetWeight", customer.getTargetWeight() != null ?
                        String.valueOf(customer.getTargetWeight()) : "",
                "targetWorkout", customer.getTargetWorkout() != null ?
                        String.valueOf(customer.getTargetWorkout()) : "",
                "targetCalories", customer.getTargetCalories() != null ?
                        String.valueOf(customer.getTargetCalories()) : ""
        );

        return user;
    }

    public void createEvent(Long id, EventRequest event) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

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
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

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
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        Event updatedEvent = customer.getEvents().stream()
                .filter(e -> e.getId().equals(eventId))
                .findFirst()
                .orElseThrow(() -> new EventNotFoundException("Event with id " + eventId + " not found"));

        updatedEvent.setTitle(event.getTitle());
        updatedEvent.setDetails(event.getDetails());
        updatedEvent.setLink(event.getLink());
        updatedEvent.setIsCancelled(event.getIsCancelled());

        customerRepository.save(customer);
    }

    public void deleteEvent(Long id, Long eventId) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        Event event = customer.getEvents().stream()
                .filter(e -> e.getId().equals(eventId))
                .findFirst()
                .orElseThrow(() -> new EventNotFoundException("Event with id " + eventId + " not found"));

        customer.getEvents().remove(event);

        customerRepository.save(customer);
    }

    public void updateTarget(Long id, TargetRequest target) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        customer.setTargetWeight(target.getWeight());
        customer.setTargetWorkout(target.getWorkout());
        customer.setTargetCalories(target.getCalories());

        customerRepository.save(customer);
    }

    public List<?> getRecords(Long id) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

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

    public void createWorkout(Long id, WorkoutRequest workout) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        Workout newWorkout = Workout.builder()
                .dayOfWeek(workout.getDayOfWeek())
                .name(workout.getName())
                .exercises(new ArrayList<>(Collections.emptyList()))
                .build();

        newWorkout.setCustomer(customer);
        customer.getWorkouts().add(newWorkout);

        customerRepository.save(customer);
    }

    public List<?> getWorkouts(Long id, String day) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        if(customer.getWorkouts() == null) {
            return Collections.emptyList();
        }

        List<Workout> workouts = customer.getWorkouts();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Workout workout : workouts) {
            if(workout.getDayOfWeek().toString().equalsIgnoreCase(day)) {
                List<Map<String, String>> exercisesList = workout.getExercises().stream().map(exercise -> Map.of(
                        "id", exercise.getId().toString(),
                        "name", exercise.getName(),
                        "details", exercise.getDetails() != null ? exercise.getDetails() : "",
                        "link", exercise.getLink() != null ? exercise.getLink() : ""
                )).collect(Collectors.toList());

                Map<String, Object> workoutMap = new HashMap<>();
                workoutMap.put("id", workout.getId().toString());
                workoutMap.put("dayOfWeek", workout.getDayOfWeek().toString());
                workoutMap.put("name", workout.getName());
                workoutMap.put("exercises", exercisesList);

                response.add(workoutMap);
            }
        }

        return response;
    }

    public void updateWorkout(Long id, Long workoutId, WorkoutRequest workout) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        Workout updatedWorkout = customer.getWorkouts().stream()
                .filter(w -> w.getId().equals(workoutId))
                .findFirst()
                .orElseThrow(() -> new WorkoutNotFoundException("Workout with id " + workoutId + " not found"));

        updatedWorkout.setName(workout.getName());

        customerRepository.save(customer);
    }


    public void deleteWorkout(Long id, Long workoutId) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        Workout workout = customer.getWorkouts().stream()
                .filter(w -> w.getId().equals(workoutId))
                .findFirst()
                .orElseThrow(() -> new WorkoutNotFoundException("Workout with id " + workoutId + " not found"));

        customer.getWorkouts().remove(workout);

        customerRepository.save(customer);
    }

    public void addExercise(Long id, Long workoutId, ExerciseRequest exercise) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        Workout workout = customer.getWorkouts().stream()
                .filter(w -> w.getId().equals(workoutId))
                .findFirst()
                .orElseThrow(() -> new WorkoutNotFoundException("Workout with id " + workoutId + " not found"));

        Exercise newExercise = com.stayfit.backend.workout.Exercise.builder()
                .name(exercise.getName())
                .details(exercise.getDetails())
                .link(exercise.getLink())
                .build();

        newExercise.setWorkout(workout);
        workout.getExercises().add(newExercise);

        customerRepository.save(customer);
    }


    public void updateExercise(Long id, Long workoutId, Long exerciseId, ExerciseRequest exercise) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        Workout workout = customer.getWorkouts().stream()
                .filter(w -> w.getId().equals(workoutId))
                .findFirst()
                .orElseThrow(() -> new WorkoutNotFoundException("Workout with id " + workoutId + " not found"));

        Exercise updatedExercise = workout.getExercises().stream()
                .filter(e -> e.getId().equals(exerciseId))
                .findFirst()
                .orElseThrow(() -> new ExerciseNotFoundException("Exercise with id " + exerciseId + " not found"));

        updatedExercise.setName(exercise.getName());
        updatedExercise.setDetails(exercise.getDetails());
        updatedExercise.setLink(exercise.getLink());

        customerRepository.save(customer);
    }

    public void deleteExercise(Long id, Long workoutId, Long exerciseId) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        Workout workout = customer.getWorkouts().stream()
                .filter(w -> w.getId().equals(workoutId))
                .findFirst()
                .orElseThrow(() -> new WorkoutNotFoundException("Workout with id " + workoutId + " not found"));

        Exercise exercise = workout.getExercises().stream()
                .filter(e -> e.getId().equals(exerciseId))
                .findFirst()
                .orElseThrow(() -> new ExerciseNotFoundException("Exercise with id " + exerciseId + " not found"));

        workout.getExercises().remove(exercise);

        customerRepository.save(customer);
    }

    public void createMeal(Long id, MealRequest meal) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        Meal newMeal = Meal.builder()
                .dayOfWeek(meal.getDayOfWeek())
                .mealType(meal.getMealType())
                .name(meal.getName())
                .details(meal.getDetails())
                .build();

        newMeal.setCustomer(customer);
        customer.getMeals().add(newMeal);

        customerRepository.save(customer);
    }

    public List<?> getMeals(Long id, String day) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        if(customer.getMeals() == null) {
            return Collections.emptyList();
        }

        List<Meal> meals = customer.getMeals();
        List<Map<String, String>> response = new ArrayList<>();

        for (Meal meal : meals) {
            if(meal.getDayOfWeek().toString().equalsIgnoreCase(day)) {
                Map<String, String> mealMap = Map.of(
                        "id", meal.getId().toString(),
                        "mealType", meal.getMealType().toString(),
                        "name", meal.getName(),
                        "details", meal.getDetails() != null ? meal.getDetails() : ""
                );

                response.add(mealMap);
            }
        }

        return response;
    }

    public void updateMeal(Long id, Long mealId, MealRequest meal) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        Meal updatedMeal = customer.getMeals().stream()
                .filter(m -> m.getId().equals(mealId))
                .findFirst()
                .orElseThrow(() -> new MealNotFoundException("Meal with id " + mealId + " not found"));

        updatedMeal.setName(meal.getName());
        updatedMeal.setDetails(meal.getDetails());

        customerRepository.save(customer);
    }

    public void deleteMeal(Long id, Long mealId) {
        Customer customer = customerRepository.findById(id)
                .map(Customer.class::cast)
                .orElseThrow(() -> new CustomerNotFoundException("Customer with id " + id + " not found"));

        Meal meal = customer.getMeals().stream()
                .filter(m -> m.getId().equals(mealId))
                .findFirst()
                .orElseThrow(() -> new MealNotFoundException("Meal with id " + mealId + " not found"));

        customer.getMeals().remove(meal);

        customerRepository.save(customer);
    }
}
