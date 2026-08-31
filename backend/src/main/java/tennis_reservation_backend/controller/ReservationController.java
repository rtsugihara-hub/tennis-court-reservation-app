package tennis_reservation_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tennis_reservation_backend.entity.Reservation;
import tennis_reservation_backend.service.ReservationService;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:5173") // React側のURL（必要に応じて調整）
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.findAll());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reservation>> getReservationsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(reservationService.findByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
        try {
            Reservation savedReservation = reservationService.save(reservation);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedReservation);
        } catch (IllegalArgumentException e) {
            // Service層で重複が検知された場合：409 Conflict を返す
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("予約の処理中にエラーが発生しました。");
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelReservation(@PathVariable Long id) {
        try {
            Reservation canceledReservation = reservationService.cancelReservation(id);
            return ResponseEntity.ok(canceledReservation);
        } catch (RuntimeException e) {
            // 対象の予約が存在しない場合など：404 Not Found を返す
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("キャンセルの処理中にエラーが発生しました。");
        }
    }
}