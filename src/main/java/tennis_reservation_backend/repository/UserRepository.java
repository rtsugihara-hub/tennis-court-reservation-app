package tennis_reservation_backend.repository;

import tennis_reservation_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> { // ★ String から Long に変更

    // メールアドレスによるユーザー検索（ログイン時等で使用）
    Optional<User> findByEmail(String email);
}