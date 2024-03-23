package com.stayfit.backend.customer.request;

import com.stayfit.backend.workout.DayOfWeek;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutRequest {
    private String name;
    private DayOfWeek dayOfWeek;
}
