package tennis_reservation_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tennis_reservation_backend.entity.Court;

@Repository
public interface CourtRepository extends JpaRepository<Court, Long> { 
    // ★ JpaRepository<Court, String> から <Court, Long> に変更
}