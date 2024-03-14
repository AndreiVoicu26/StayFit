package com.stayfit.backend.record;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface RecordRepository extends JpaRepository<Record, Long> {
    boolean existsByDate(LocalDate date);

    Optional<Record> findByDate(LocalDate date);
}
