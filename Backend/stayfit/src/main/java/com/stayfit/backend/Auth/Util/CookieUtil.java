package com.stayfit.backend.Auth.Util;

import com.stayfit.backend.Exception.CookieNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Arrays;

public class CookieUtil {

    public static void createCookie(HttpServletResponse response, String name, String value, boolean httpOnly) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");
        cookie.setHttpOnly(httpOnly);
        response.addCookie(cookie);
    }

    public static void clearCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }

    public static void clearCookies(HttpServletRequest request, HttpServletResponse response) {
        for (Cookie cookie : request.getCookies()) {
            CookieUtil.clearCookie(response, cookie.getName());
        }
    }

    public static String getCookieValue(HttpServletRequest request, String name) {
        if (request.getCookies() == null) {
            throw new CookieNotFoundException("No cookies found in the request");
        }

        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals(name))
                .findFirst()
                .orElseThrow(() -> new CookieNotFoundException("Cookie with name " + name + " not found"))
                .getValue();

    }
}
