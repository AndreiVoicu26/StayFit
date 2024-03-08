package com.stayfit.backend.customer;

import com.stayfit.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Transactional
    Optional<Customer> findByUser(User user);

    @Transactional
    Optional<Customer> findByUserUsername(String username);

    boolean existsByUser(User user);

    @Transactional
    void deleteByUser(User user);
}
