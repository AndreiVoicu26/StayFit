package com.stayfit.backend.Nutrition;

import com.stayfit.backend.Customer.Customer;
import com.stayfit.backend.Workout.DayOfWeek;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "nutritional_plans")
public class NutritionalPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    @OneToMany(mappedBy = "nutritionalPlan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Meal> meals;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
