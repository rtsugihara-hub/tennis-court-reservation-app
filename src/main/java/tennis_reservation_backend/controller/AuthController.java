package tennis_reservation_backend.controller;

import tennis_reservation_backend.entity.User;
import tennis_reservation_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // ログイン API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> request) {
        String email = null;
        String password = null;

        // dma_login ネスト構造のチェック
        if (request.containsKey("dma_login") && request.get("dma_login") instanceof Map) {
            Map<?, ?> loginData = (Map<?, ?>) request.get("dma_login");
            email = String.valueOf(loginData.get("email"));
            password = String.valueOf(loginData.get("password"));
        } else {
            email = String.valueOf(request.get("email"));
            password = String.valueOf(request.get("password"));
        }

        return userService.login(email, password)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "メールアドレスまたはパスワードが正しくありません。")));
    }
}