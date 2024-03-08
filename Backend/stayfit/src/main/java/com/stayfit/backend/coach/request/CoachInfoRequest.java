package com.stayfit.backend.coach.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CoachInfoRequest {
    private String qualification;
    private String description;
}
