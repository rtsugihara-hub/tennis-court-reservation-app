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
    private ReservationRepository reservationRepository;

    public List<Court> getAllCourts() {
        return courtRepository.findAll();
    }

    public Optional<Court> getCourtById(Long id) {
        return courtRepository.findById(id);
    }

    // ★ 保存・更新処理（更新時の予約チェック付き）
    public Court saveCourt(Court court) {
        if (court.getId() != null) {
            boolean hasActiveReservations = reservationRepository.existsByCourtIdAndStatusNot(court.getId(), "cancelled");
            if (hasActiveReservations) {
                throw new IllegalStateException("このコートには既に予約が存在するため編集・更新できません。");
            }
        }
        return courtRepository.save(court);
    }

    // ★ 予約チェック付きの削除処理（論理削除）
    public void deleteCourtById(Long id) {
        boolean hasActiveReservations = reservationRepository.existsByCourtIdAndStatusNot(id, "cancelled");
        if (hasActiveReservations) {
            throw new IllegalStateException("このコートには既に予約が存在するため削除できません。");
        }

        courtRepository.findById(id).ifPresent(court -> {
            court.setIsDeleted(true);
            courtRepository.save(court);
        });
    }
}