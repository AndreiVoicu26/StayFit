package com.stayfit.backend.user;

import com.stayfit.backend.auth.AuthenticationService;
import com.stayfit.backend.user.request.AccountInfoRequest;
import com.stayfit.backend.user.request.CredentialsRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthenticationService authenticationService;

    @PutMapping( "/picture")
    public ResponseEntity<?> uploadProfilePicture(@RequestParam("picture") MultipartFile picture) {
        try {
            userService.uploadProfilePicture(picture.getBytes());

            return ResponseEntity.ok("Profile picture uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error uploading profile picture");
        }
    }

    @GetMapping("/picture")
    public ResponseEntity<?> getProfilePicture() {
        byte[] picture = userService.getProfilePicture();

        return ResponseEntity.ok(picture);
    }

    @DeleteMapping("/picture")
    public ResponseEntity<?> deleteProfilePicture() {
        userService.deleteProfilePicture();

        return ResponseEntity.ok("Profile picture deleted successfully");
    }

    @PutMapping("/info")
    public ResponseEntity<?> updateUserInfo(@RequestBody AccountInfoRequest info) {
        userService.updateUserInfo(info);

        return ResponseEntity.ok("User info updated successfully");
    }

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo() {
        AccountInfoRequest response = userService.getUserInfo();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/credentials")
    public ResponseEntity<?> updateCredentials(@RequestBody CredentialsRequest credentials, HttpServletRequest request, HttpServletResponse response) {
        boolean res = authenticationService.updateCredentials(credentials, request, response);

        return ResponseEntity.ok(res);
    }
}

