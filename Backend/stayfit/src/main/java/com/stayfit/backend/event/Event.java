package com.stayfit.backend.event;

import com.stayfit.backend.customer.Customer;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "details")
    private String details;

    @Column(name = "link")
    private String link;

    @Column(name = "is_cancelled")
    private Boolean isCancelled;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
