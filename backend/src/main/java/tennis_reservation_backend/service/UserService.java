package tennis_reservation_backend.service;

import tennis_reservation_backend.entity.User;
import tennis_reservation_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ログイン処理（メールアドレスとパスワードで認証）
    public Optional<User> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password));
    }

    // ★ 修正箇所：引数の型を String から Long に変更
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}