package com.stayfit.backend.Auth;

import com.stayfit.backend.Auth.Util.CookieUtil;
import com.stayfit.backend.Exception.CookieNotFoundException;
import com.stayfit.backend.User.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getServletPath().startsWith("/api/v1/auth") &&
                !request.getServletPath().equals("/api/v1/auth/refresh-token") &&
                !request.getServletPath().equals("/api/v1/auth/check-authentication") &&
                !request.getServletPath().equals("/api/v1/auth/check-status")){
            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String token = !request.getServletPath().equals("/api/v1/auth/refresh-token") ?
                    CookieUtil.getCookieValue(request, "accessToken") :
                    CookieUtil.getCookieValue(request, "refreshToken");

            if (token == null || token.isEmpty() || !(jwtService.isAccessToken(token) || jwtService.isRefreshToken(token))) {
                filterChain.doFilter(request, response);
                return;
            }

            final String username = jwtService.extractUsername(token);
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userService.userDetailsService().loadUserByUsername(username);

                if (jwtService.isTokenValid(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request, response);
        } catch (CookieNotFoundException | UsernameNotFoundException e) {
            if (!request.getServletPath().equals("/api/v1/auth/check-authentication") && !request.getServletPath().equals("/api/v1/auth/check-status")) {
                throw e;
            }

            filterChain.doFilter(request, response);
        }
    }
}
