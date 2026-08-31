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
        return courtRepository.findAll();
    }

    public Optional<Court> getCourtById(Long id) {
        return courtRepository.findById(id);
    }

    // ★ 保存・更新処理
    public Court saveCourt(Court court) {
        return courtRepository.save(court);
    }

    // ★ 削除処理
    public void deleteCourtById(Long id) {
        courtRepository.deleteById(id);
    }
}