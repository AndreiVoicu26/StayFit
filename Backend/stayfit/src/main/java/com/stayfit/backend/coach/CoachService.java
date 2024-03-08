package com.stayfit.backend.coach;

import com.stayfit.backend.coach.request.CoachInfoRequest;
import com.stayfit.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CoachService {

    private final UserRepository userRepository;
    private final CoachRepository coachRepository;


    public void updateCoachInfo(CoachInfoRequest info) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Coach coach = coachRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Coach with username " + username + " not found"));

        coach.setQualification(info.getQualification());
        coach.setDescription(info.getDescription());

        coachRepository.save(coach);
    }

    public CoachInfoRequest getCoachInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Coach coach = coachRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Coach with username " + username + " not found"));

        return CoachInfoRequest.builder()
                .qualification(coach.getQualification())
                .description(coach.getDescription())
                .build();
    }
}
