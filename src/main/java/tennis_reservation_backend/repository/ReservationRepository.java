package tennis_reservation_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tennis_reservation_backend.entity.Reservation;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);

    boolean existsByCourtIdAndDateAndTimeSlotAndStatusNot(Long courtId, String date, String timeSlot, String status);

    // ★ 特定コートにキャンセル以外の予約が存在するか判定
    boolean existsByCourtIdAndStatusNot(Long courtId, String status);
}