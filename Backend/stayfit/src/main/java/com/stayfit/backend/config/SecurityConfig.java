package com.stayfit.backend.config;

import com.stayfit.backend.auth.handler.OAuth2LoginHandler;
import com.stayfit.backend.auth.JwtAuthenticationFilter;
import com.stayfit.backend.auth.JwtService;
import com.stayfit.backend.auth.util.CookieUtil;
import com.stayfit.backend.customer.CustomerRepository;
import com.stayfit.backend.user.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.stayfit.backend.user.Role.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req -> req
                        .requestMatchers("/api/v1/customer/**").hasRole(CUSTOMER.name())
                        .requestMatchers("/api/v1/coach/**").hasRole(COACH.name())
                        .requestMatchers("/api/v1/admin/**").hasRole(SYS_ADMIN.name())
                        .requestMatchers("/api/v1/user/**").hasAnyRole(CUSTOMER.name(), COACH.name(), SYS_ADMIN.name())
                        .requestMatchers("/api/v1/auth/refresh-token").hasAnyRole(CUSTOMER.name(), COACH.name(), SYS_ADMIN.name())
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2LoginHandler(jwtService, userRepository, customerRepository))
                )
                .authenticationProvider(authenticationProvider)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                        .logoutUrl("/api/v1/auth/logout")
                        .addLogoutHandler(((request, response, authentication) -> {
                            CookieUtil.clearCookies(request, response);
                            SecurityContextHolder.clearContext();
                        }))
                        .logoutSuccessHandler(((request, response, authentication) -> response.setStatus(HttpServletResponse.SC_OK)))
                        .clearAuthentication(true)
                        .invalidateHttpSession(true)
                );

        return http.build();
    }
}
