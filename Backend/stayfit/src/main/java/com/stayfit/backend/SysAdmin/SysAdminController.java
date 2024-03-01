package com.stayfit.backend.SysAdmin;

import com.stayfit.backend.Customer.Status;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class SysAdminController {

    private final SysAdminService sysAdminService;

    @PostMapping("/coach")
    public ResponseEntity<?> registerCoach(@RequestBody RegisterCoachRequest request) {
        sysAdminService.registerCoach(request);

        return ResponseEntity.ok().body("Coach has been registered successfully");
    }

    @GetMapping("/coaches")
    public ResponseEntity<?> getCoaches() {
        List<?> coaches = sysAdminService.getCoaches();

        return ResponseEntity.ok(sysAdminService.getCoaches());
    }

    @DeleteMapping("/coach/{id}")
    public ResponseEntity<?> deleteCoach(@PathVariable Long id) {
        sysAdminService.deleteCoach(id);

        return ResponseEntity.ok().body("Coach has been deleted successfully");
    }

    @GetMapping("/customers")
    public ResponseEntity<?> getCustomers() {
        List<?> customers = sysAdminService.getCustomers();

        return ResponseEntity.ok(sysAdminService.getCustomers());
    }

    @DeleteMapping("/customer/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        sysAdminService.deleteCustomer(id);

        return ResponseEntity.ok().body("Customer has been deleted successfully");
    }

    @PutMapping("/customer/{id}")
    public ResponseEntity<?> activateOrDeactivateCustomer(@PathVariable Long id) {
        Status status = sysAdminService.switchCustomerStatus(id);

        if(status == Status.ACTIVE) {
            return ResponseEntity.ok().body("Customer has been activated successfully");
        }
        else {
            return ResponseEntity.ok().body("Customer has been deactivated successfully");
        }
    }


}
