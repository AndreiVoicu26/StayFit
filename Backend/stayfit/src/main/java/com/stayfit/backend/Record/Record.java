package com.stayfit.backend.Record;

import com.stayfit.backend.Customer.Customer;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "records")
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDate date;

    @NotNull
    private Double weight;

    @NotNull
    private Integer calories;

    private Integer workoutPeriod;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
