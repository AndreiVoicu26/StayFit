package com.stayfit.backend.exception;

public class AccountAlreadyActiveException extends RuntimeException {
    public AccountAlreadyActiveException(String message) {
        super(message);
    }
}
