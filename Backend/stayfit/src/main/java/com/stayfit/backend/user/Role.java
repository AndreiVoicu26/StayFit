package com.stayfit.backend.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public enum Role {
    CUSTOMER(Set.of(
            Permission.CUSTOMER_CREATE,
            Permission.CUSTOMER_READ,
            Permission.CUSTOMER_UPDATE,
            Permission.CUSTOMER_DELETE
    )),
    COACH(Set.of(
            Permission.COACH_CREATE,
            Permission.COACH_READ,
            Permission.COACH_UPDATE,
            Permission.COACH_DELETE
    )),
    SYS_ADMIN(Set.of(
            Permission.SYS_ADMIN_CREATE,
            Permission.SYS_ADMIN_READ,
            Permission.SYS_ADMIN_UPDATE,
            Permission.SYS_ADMIN_DELETE
    ));

    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
