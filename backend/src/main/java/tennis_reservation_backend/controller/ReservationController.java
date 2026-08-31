package tennis_reservation_backend.controller;

import org.springframework.web.bind.annotation.*;
import tennis_reservation_backend.entity.Reservation;
import tennis_reservation_backend.service.ReservationService;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
// @CrossOrigin(origins = "*")\
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Reservation> getReservationsByUserId(@PathVariable Long userId) { // ★ Long に変更
        return reservationService.findByUserId(userId);
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.save(reservation);
    }

    @PutMapping("/{id}/cancel")
    public Reservation cancelReservation(@PathVariable Long id) { // ★ Long に変更
        return reservationService.cancelReservation(id);
    }
}