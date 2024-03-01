package com.stayfit.backend.event;

import com.stayfit.backend.customer.Customer;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDate date;

    @NotNull
    private String title;

    private String details;

    @URL
    private String link;

    private Boolean isCancelled;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
