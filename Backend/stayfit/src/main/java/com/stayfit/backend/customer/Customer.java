package com.stayfit.backend.customer;

import com.stayfit.backend.coach.Coach;
import com.stayfit.backend.event.Event;
import com.stayfit.backend.nutrition.Meal;
import com.stayfit.backend.record.Record;
import com.stayfit.backend.user.User;
import com.stayfit.backend.workout.Workout;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "membership_type")
    private MembershipType membershipType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @FutureOrPresent
    @Column(name = "next_billing_date")
    private LocalDate nextBillingDate;

    @Column(name = "target_weight")
    private Double targetWeight;

    @Column(name = "target_workout")
    private Integer targetWorkout;

    @Column(name = "target_calories")
    private Integer targetCalories;

    @ManyToOne
    @JoinColumn(name = "coach_id")
    private Coach coach;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Event> events;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Record> records;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Workout> workouts;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Meal> meals;
}
