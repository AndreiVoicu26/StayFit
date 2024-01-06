package com.stayfit.backend.Customer;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Data
@Entity
@Table(name = "payment_details")
public class PaymentDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Pattern(regexp = "^[0-9]{16}$")
    private String cardNumber;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z]+$")
    private String cardHolderName;

    @NotNull
    @DateTimeFormat(pattern = "MM/yy")
    @FutureOrPresent
    private LocalDate expirationDate;

    @NotNull
    @Pattern(regexp = "^[0-9]{3}$")
    private String cvv;
}
