package tennis_reservation_backend.service;

import tennis_reservation_backend.entity.Court;
import tennis_reservation_backend.repository.CourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourtService {

    @Autowired
    private CourtRepository courtRepository;

    public List<Court> getAllCourts() {
        // 全件取得ではなく、未削除のコートのみ返却する場合
        return courtRepository.findByIsDeletedFalse();
    }

    public Optional<Court> getCourtById(Long id) {
        return courtRepository.findById(id);
    }

    public Court saveCourt(Court court) {
        return courtRepository.save(court);
    }

    // ★ 物理削除から論理削除（isDeleted = true への更新）に変更
    public void deleteCourtById(Long id) {
        courtRepository.findById(id).ifPresent(court -> {
            court.setIsDeleted(true);
            courtRepository.save(court);
        });
    }
}