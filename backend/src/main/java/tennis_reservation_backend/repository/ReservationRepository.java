package tennis_reservation_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tennis_reservation_backend.entity.Reservation;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);

    // ★ 重複チェック用：同じコート・日付・時間帯で、ステータスが "cancelled" 以外の予約が存在するか確認
    boolean existsByCourtIdAndDateAndTimeSlotAndStatusNot(
        Long courtId, String date, String timeSlot, String status
    );
}