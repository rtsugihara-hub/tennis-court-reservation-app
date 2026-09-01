package tennis_reservation_backend.service;

import tennis_reservation_backend.entity.Court;
import tennis_reservation_backend.repository.CourtRepository;
import tennis_reservation_backend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourtService {

    @Autowired
    private CourtRepository courtRepository;

    @Autowired
    private ReservationRepository reservationRepository; // ★ 追加

    public List<Court> getAllCourts() {
        return courtRepository.findAll();
    }

    public Optional<Court> getCourtById(Long id) {
        return courtRepository.findById(id);
    }

    public Court saveCourt(Court court) {
        return courtRepository.save(court);
    }

    // ★ 予約チェック付きの削除処理（論理削除）
    public void deleteCourtById(Long id) {
        // 1. 対象コートにキャンセルされていない予約が存在するかチェック
        boolean hasActiveReservations = reservationRepository.existsByCourtIdAndStatusNot(id, "cancelled");
        if (hasActiveReservations) {
            throw new IllegalStateException("このコートには既に予約が存在するため削除できません。");
        }

        // 2. 予約がなければ論理削除を実行
        courtRepository.findById(id).ifPresent(court -> {
            court.setIsDeleted(true);
            courtRepository.save(court);
        });
    }
}