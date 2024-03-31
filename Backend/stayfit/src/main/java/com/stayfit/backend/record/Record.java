package com.stayfit.backend.record;

import com.stayfit.backend.customer.Customer;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "records")
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "weight", nullable = false)
    private Double weight;

    @Column(name = "calories", nullable = false)
    private Integer calories;

    @Column(name = "workout", nullable = false)
    private Integer workout;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
