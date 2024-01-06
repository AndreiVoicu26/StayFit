package com.stayfit.backend.Coach;

import com.stayfit.backend.Customer.Customer;
import com.stayfit.backend.User.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.util.Set;

@Data
@Entity
@Table(name = "coaches")
public class Coach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "coach")
    private Set<Customer> customers;

    @NotNull
    @Length(min = 20)
    private String description;
}
