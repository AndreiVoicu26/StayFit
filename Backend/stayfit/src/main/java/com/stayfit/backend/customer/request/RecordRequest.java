package com.stayfit.backend.customer.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecordRequest {
    private LocalDate date;
    private Double weight;
    private Integer calories;
    private Integer workout;
}
