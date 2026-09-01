package tennis_reservation_backend.service;

import org.springframework.stereotype.Service;
import tennis_reservation_backend.entity.Reservation;
import tennis_reservation_backend.repository.CourtRepository;
import tennis_reservation_backend.repository.ReservationRepository;
import tennis_reservation_backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final CourtRepository courtRepository;

    public ReservationService(ReservationRepository reservationRepository,
                              UserRepository userRepository,
                              CourtRepository courtRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.courtRepository = courtRepository;
    }

    public List<Reservation> findAll() {
        List<Reservation> reservations = reservationRepository.findAll();
        populateNames(reservations);
        return reservations;
    }

    public List<Reservation> findByUserId(Long userId) {
        List<Reservation> reservations = reservationRepository.findByUserId(userId);
        populateNames(reservations);
        return reservations;
    }

    public Optional<Reservation> findById(Long id) {
        Optional<Reservation> reservationOpt = reservationRepository.findById(id);
        reservationOpt.ifPresent(reservation -> populateNames(List.of(reservation)));
        return reservationOpt;
    }

    public Reservation save(Reservation reservation) {
        // 重複チェック処理
        boolean isAlreadyBooked = reservationRepository.existsByCourtIdAndDateAndTimeSlotAndStatusNot(
            reservation.getCourtId(),
            reservation.getDate(),
            reservation.getTimeSlot(),
            "cancelled"
        );

        if (isAlreadyBooked) {
            throw new IllegalArgumentException("指定されたコート・日時は既に予約されています。");
        }

        // ステータスの初期値設定
        if (reservation.getStatus() == null) {
            reservation.setStatus("confirmed");
        }

        Reservation savedReservation = reservationRepository.save(reservation);
        populateNames(List.of(savedReservation));
        return savedReservation;
    }

    public Reservation cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("予約が見つかりません: " + id));
        
        reservation.setStatus("cancelled");
        Reservation updatedReservation = reservationRepository.save(reservation);
        populateNames(List.of(updatedReservation));
        return updatedReservation;
    }

    // ★ 追加：任意のステータスに更新する処理
    public Reservation updateStatus(Long id, String status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("予約が見つかりません: " + id));
        
        reservation.setStatus(status);
        Reservation updatedReservation = reservationRepository.save(reservation);
        populateNames(List.of(updatedReservation));
        return updatedReservation;
    }

    // ★ 取得した予約データに対して、UserとCourtの情報から名前をセットする共通処理
    private void populateNames(List<Reservation> reservations) {
        for (Reservation reservation : reservations) {
            if (reservation.getUserId() != null) {
                userRepository.findById(reservation.getUserId())
                        .ifPresent(user -> reservation.setUserName(user.getName()));
            }
            if (reservation.getCourtId() != null) {
                courtRepository.findById(reservation.getCourtId())
                        .ifPresent(court -> reservation.setCourtName(court.getName()));
            }
        }
    }
}