package tennis_reservation_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tennis_reservation_backend.entity.Court;
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

    // ★ 予約作成処理：コートのステータスを 'reserved' に更新
    @Transactional
    public Reservation save(Reservation reservation) {
        // 1. 対象コートのステータスチェック（available 以外は予約不可）
        if (reservation.getCourtId() != null) {
            Court court = courtRepository.findById(reservation.getCourtId())
                    .orElseThrow(() -> new IllegalArgumentException("指定されたコートが存在しません。"));

            if (!"available".equals(court.getStatus())) {
                throw new IllegalArgumentException("指定されたコート・日時は既に予約されているか、利用不可です。");
            }

            // コートのステータスを reserved (予約済み) に更新
            court.setStatus("reserved");
            courtRepository.save(court);
        }

        // 2. 予約重複チェック処理
        boolean isAlreadyBooked = reservationRepository.existsByCourtIdAndDateAndTimeSlotAndStatusNot(
            reservation.getCourtId(),
            reservation.getDate(),
            reservation.getTimeSlot(),
            "cancelled"
        );

        if (isAlreadyBooked) {
            throw new IllegalArgumentException("指定されたコート・日時は既に予約されています。");
        }

        // 3. ステータスの初期値設定
        if (reservation.getStatus() == null) {
            reservation.setStatus("confirmed");
        }

        Reservation savedReservation = reservationRepository.save(reservation);
        populateNames(List.of(savedReservation));
        return savedReservation;
    }

    // ★ キャンセル処理：コートのステータスを 'available' に復元
    @Transactional
    public Reservation cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("予約が見つかりません: " + id));
        
        // 1. 予約ステータスを cancelled に変更
        reservation.setStatus("cancelled");
        Reservation updatedReservation = reservationRepository.save(reservation);

        // 2. 該当コートのステータスを available (利用可能) に戻す
        if (reservation.getCourtId() != null) {
            courtRepository.findById(reservation.getCourtId()).ifPresent(court -> {
                court.setStatus("available");
                courtRepository.save(court);
            });
        }

        populateNames(List.of(updatedReservation));
        return updatedReservation;
    }

    // ★ ステータス更新処理：管理者キャンセル時等も 'available' に復元
    @Transactional
    public Reservation updateStatus(Long id, String status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("予約が見つかりません: " + id));
        
        reservation.setStatus(status);

        // キャンセルに変更された場合はコートを復帰
        if ("cancelled".equals(status) && reservation.getCourtId() != null) {
            courtRepository.findById(reservation.getCourtId()).ifPresent(court -> {
                court.setStatus("available");
                courtRepository.save(court);
            });
        }

        Reservation updatedReservation = reservationRepository.save(reservation);
        populateNames(List.of(updatedReservation));
        return updatedReservation;
    }

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