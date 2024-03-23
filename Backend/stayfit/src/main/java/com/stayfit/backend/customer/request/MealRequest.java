package com.stayfit.backend.customer.request;

import com.stayfit.backend.nutrition.MealType;
import com.stayfit.backend.workout.DayOfWeek;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MealRequest {
    private String name;
    private String details;
    private DayOfWeek dayOfWeek;
    private MealType mealType;
}
