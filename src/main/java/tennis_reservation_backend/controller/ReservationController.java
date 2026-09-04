package tennis_reservation_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tennis_reservation_backend.entity.Reservation;
import tennis_reservation_backend.service.ReservationService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
// CORS で HTTP メソッド (PATCH, PUT, OPTIONS 等) を明確に許可設定
@CrossOrigin(
    origins = "http://localhost:8080", 
    allowCredentials = "true", 
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS}
)
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    // 全予約一覧取得
    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.findAll());
    }

    // ユーザー別予約一覧取得
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getReservationsByUserId(@PathVariable Long userId) {
        try {
            List<Reservation> reservations = reservationService.findByUserId(userId);
            return ResponseEntity.ok(reservations);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ユーザー予約履歴の取得中にエラーが発生しました。");
        }
    }

    // P08 予約詳細取得 API (GET /api/reservations/{id})
    @GetMapping("/{id:\\d+}")
    public ResponseEntity<?> getReservationById(@PathVariable Long id) {
        try {
            Reservation reservation = reservationService.findById(id).orElse(null);

            if (reservation != null) {
                return ResponseEntity.ok(reservation);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("予約情報が見つかりません。");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("予約詳細の取得中にエラーが発生しました。");
        }
    }

    // 新規予約作成
    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
        try {
            Reservation savedReservation = reservationService.save(reservation);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedReservation);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("予約の処理中にエラーが発生しました。");
        }
    }

    // P08 予約キャンセル API (PUT/PATCH の双方で受け出し可能)
    @RequestMapping(value = "/{id:\\d+}/cancel", method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<?> cancelReservation(@PathVariable Long id) {
        try {
            Reservation canceledReservation = reservationService.cancelReservation(id);
            return ResponseEntity.ok(canceledReservation);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("キャンセルの処理中にエラーが発生しました。");
        }
    }

    // ステータス更新 API (PUT /api/reservations/{id}/status)
    @PutMapping("/{id:\\d+}/status")
    public ResponseEntity<?> updateReservationStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            String newStatus = request.get("status");
            Reservation updatedReservation = reservationService.updateStatus(id, newStatus);
            return ResponseEntity.ok(updatedReservation);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ステータス更新処理中にエラーが発生しました。");
        }
    }
}