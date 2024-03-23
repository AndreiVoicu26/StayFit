package com.stayfit.backend.nutrition;

import com.stayfit.backend.customer.Customer;
import com.stayfit.backend.workout.DayOfWeek;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "meals")
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    @NotNull
    @Enumerated(EnumType.STRING)
    private MealType mealType;

    @NotNull
    private String name;

    private String details;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
