package tennis_reservation_backend.service;

import org.springframework.stereotype.Service;
import tennis_reservation_backend.entity.Reservation;
import tennis_reservation_backend.repository.ReservationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    public List<Reservation> findByUserId(Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    public Optional<Reservation> findById(Long id) {
        return reservationRepository.findById(id);
    }

    public Reservation save(Reservation reservation) {
        // ★ 重複チェック処理を追加
        boolean isAlreadyBooked = reservationRepository.existsByCourtIdAndDateAndTimeSlotAndStatusNot(
            reservation.getCourtId(),
            reservation.getDate(),
            reservation.getTimeSlot(),
            "cancelled"
        );

        if (isAlreadyBooked) {
            // 例外をスロー（Controller側でキャッチして 409 Conflict を返す）
            throw new IllegalArgumentException("指定されたコート・日時は既に予約されています。");
        }

        // ステータスの初期値設定
        if (reservation.getStatus() == null) {
            reservation.setStatus("confirmed");
        }
        return reservationRepository.save(reservation);
    }

    public Reservation cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("予約が見つかりません: " + id));
        
        reservation.setStatus("cancelled");
        return reservationRepository.save(reservation);
    }
}