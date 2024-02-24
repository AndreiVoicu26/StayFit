package com.stayfit.backend.Exception;

public class AccountAlreadyActive extends RuntimeException {
    public AccountAlreadyActive(String message) {
        super(message);
    }
}
