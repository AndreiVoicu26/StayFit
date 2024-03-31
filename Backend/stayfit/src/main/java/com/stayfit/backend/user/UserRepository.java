package com.stayfit.backend.user;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Transactional
    Optional<User> findByUsername(String username);

    @Transactional
    Optional<User> findByEmail(String email);

    Optional<User> findByResetPasswordToken(String resetPasswordToken);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}
