package com.stayfit.backend.Exception;

public class CookieNotFoundException extends RuntimeException {
    public CookieNotFoundException(String message) {
        super(message);
    }
}
