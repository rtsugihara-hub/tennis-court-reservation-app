package tennis_reservation_backend.controller;

import tennis_reservation_backend.entity.Court;
import tennis_reservation_backend.service.CourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courts")
public class CourtController {

    @Autowired
    private CourtService courtService;

    // 1. コート一覧取得 API
    @GetMapping
    public ResponseEntity<List<Court>> getAllCourts() {
        return ResponseEntity.ok(courtService.getAllCourts());
    }

    // 2. コート詳細取得 API
    @GetMapping("/{id}")
    public ResponseEntity<Court> getCourtById(@PathVariable Long id) {
        return courtService.getCourtById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. ★ 追加：コート新規登録 API (POST)
    @PostMapping
    public ResponseEntity<Court> createCourt(@RequestBody Court court) {
        Court savedCourt = courtService.saveCourt(court);
        return ResponseEntity.ok(savedCourt);
    }

    // 4. ★ 追加：コート更新 API (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourt(@PathVariable Long id, @RequestBody Court court) {
        try {
            court.setId(id);
            Court updated = courtService.saveCourt(court);
            return ResponseEntity.ok(updated);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("更新処理中にエラーが発生しました。");
        }
    }

    // 5. コート削除 API (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourt(@PathVariable Long id) {
        try {
            courtService.deleteCourtById(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("コートの削除処理中にエラーが発生しました。");
        }
    }
}