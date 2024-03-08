package com.stayfit.backend.coach;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface CoachRepository extends JpaRepository<Coach, Long> {

    @Transactional
    Optional<Coach> findByUserUsername(String username);
}
