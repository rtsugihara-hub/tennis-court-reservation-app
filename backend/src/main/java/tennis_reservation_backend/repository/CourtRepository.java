package tennis_reservation_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tennis_reservation_backend.entity.Court;
import java.util.List;

@Repository
public interface CourtRepository extends JpaRepository<Court, Long> { 
    // ★ 削除されていないコートのみ取得
    List<Court> findByIsDeletedFalse();
}