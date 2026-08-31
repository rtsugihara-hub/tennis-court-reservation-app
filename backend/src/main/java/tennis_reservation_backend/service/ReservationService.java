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
        // ★ 修正箇所：Long型のため isEmpty() ではなく null チェックで判定（自動採番させるため手動ID設定は不要）
        if (reservation.getStatus() == null) {
            reservation.setStatus("confirmed");
        }
        return reservationRepository.save(reservation);
    }

    public Reservation cancelReservation(Long id) {
        // ★ 修正箇所：引数を Long 型に合わせる
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("予約が見つかりません: " + id));
        
        reservation.setStatus("cancelled");
        return reservationRepository.save(reservation);
    }
}