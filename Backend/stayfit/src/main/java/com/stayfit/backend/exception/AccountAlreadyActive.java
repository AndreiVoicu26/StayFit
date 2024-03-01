package com.stayfit.backend.exception;

public class AccountAlreadyActive extends RuntimeException {
    public AccountAlreadyActive(String message) {
        super(message);
    }
}
