package com.stayfit.backend.exception;

public class InvalidMembershipChangeException extends RuntimeException {
    public InvalidMembershipChangeException(String message) {
        super(message);
    }
}
