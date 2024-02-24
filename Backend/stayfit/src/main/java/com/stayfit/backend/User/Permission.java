package com.stayfit.backend.User;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Permission {

    CUSTOMER_CREATE("customer:create"),
    CUSTOMER_READ("customer:read"),
    CUSTOMER_UPDATE("customer:update"),
    CUSTOMER_DELETE("customer:delete"),
    COACH_CREATE("coach:create"),
    COACH_READ("coach:read"),
    COACH_UPDATE("coach:update"),
    COACH_DELETE("coach:delete"),
    SYS_ADMIN_CREATE("sys_admin:create"),
    SYS_ADMIN_READ("sys_admin:read"),
    SYS_ADMIN_UPDATE("sys_admin:update"),
    SYS_ADMIN_DELETE("sys_admin:delete");

    private final String permission;
}
