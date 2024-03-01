package com.stayfit.backend.customer;

import lombok.Getter;

@Getter
public enum MembershipType {
    ONE_MONTH(1),
    SIX_MONTHS(6),
    ONE_YEAR(12);

    private final int durationMonths;

    MembershipType(int durationMonths) {
        this.durationMonths = durationMonths;
    }

}