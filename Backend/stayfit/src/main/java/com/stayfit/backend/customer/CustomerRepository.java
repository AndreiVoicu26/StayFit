package com.stayfit.backend.customer;

import com.stayfit.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByUser(User user);

    Optional<Customer> findByUserUsername(String username);
}
