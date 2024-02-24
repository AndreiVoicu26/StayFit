package com.stayfit.backend.Exception;

public class UserAlreadyLoggedInException extends RuntimeException {
    public UserAlreadyLoggedInException(String message) {
        super(message);
    }
}
