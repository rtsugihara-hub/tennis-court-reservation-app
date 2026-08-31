package tennis_reservation_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tennis_reservation_backend.entity.Reservation;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> { // ★ JpaRepository<Reservation, Long>
    List<Reservation> findByUserId(Long userId); // ★ 引数を Long に変更
}