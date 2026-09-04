package tennis_reservation_backend.service;

import tennis_reservation_backend.entity.Court;
import tennis_reservation_backend.repository.CourtRepository;
import tennis_reservation_backend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    // ★ 保存・更新処理（すべての必須カラムに対する null 防御措置）
    @Transactional
    public Court saveCourt(Court court) {
        // 1. isIndoor の null 防御
        if (court.getIsIndoor() == null) {
            court.setIsIndoor(false);
        }

        // 2. pricePerHour の null 防御（0 円で補正）
        if (court.getPricePerHour() == null) {
            court.setPricePerHour(0);
        }

        // 3. status の null / 空文字 防御
        if (court.getStatus() == null || court.getStatus().trim().isEmpty()) {
            court.setStatus("available");
        }

        // 4. isDeleted の null 防御
        if (court.getIsDeleted() == null) {
            court.setIsDeleted(false);
        }

        // 5. 更新時の予約存在チェック
        if (court.getId() != null) {
            boolean hasActiveReservations = reservationRepository.existsByCourtIdAndStatusNot(court.getId(), "cancelled");
            if (hasActiveReservations) {
                throw new IllegalStateException("このコートには既に予約が存在するため編集・更新できません。");
            }
        }
        return courtRepository.save(court);
    }

    // ★ 予約チェック付きの削除処理（論理削除）
    @Transactional
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