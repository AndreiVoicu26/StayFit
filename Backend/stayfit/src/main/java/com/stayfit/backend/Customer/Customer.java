package com.stayfit.backend.Customer;

import com.stayfit.backend.Coach.Coach;
import com.stayfit.backend.Event.Event;
import com.stayfit.backend.Nutrition.NutritionalPlan;
import com.stayfit.backend.Record.Record;
import com.stayfit.backend.User.User;
import com.stayfit.backend.Workout.WorkoutPlan;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "coach_id")
    private Coach coach;

    @NotNull
    @Enumerated(EnumType.STRING)
    private MembershipType membershipType;

    @NotNull
    @FutureOrPresent
    private LocalDate nextBillingDate;

    @OneToOne
    @JoinColumn(name = "payment_details_id", referencedColumnName = "id")
    private PaymentDetails paymentDetails;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Event> events;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Record> records;

    private Double targetWeight;

    private Integer targetCalories;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkoutPlan> workoutPlans;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NutritionalPlan> nutritionalPlans;
}
