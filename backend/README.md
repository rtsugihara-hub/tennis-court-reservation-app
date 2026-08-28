# Backend (Java + Spring Boot)

テニスコート予約システムのバックエンドAPIサーバーです。

## ディレクトリ構成

```text
backend/
├── Dockerfile                  # Dockerビルド設定
├── pom.xml                     # Maven依存関係
├── sql/
│   └── create_table.sql        # DBテーブル作成用SQL
└── src/
    └── main/
        ├── resources/
        │   └── application.properties # DB接続・環境設定
        └── java/com/example/tennisreservation/
            ├── TennisReservationApplication.java # メイン起動クラス
            ├── controller/     # APIエンドポイント定義
            │   ├── AuthController.java          # ログイン・認証API
            │   ├── CourtController.java         # ユーザー用コートAPI
            │   ├── ReservationController.java   # ユーザー用予約API
            │   └── admin/
            │       └── AdminReservationController.java # 管理者用予約検索API
            ├── service/        # ビジネスロジック層
            │   ├── AuthService.java             # 認証・ユーザー検証ロジック
            │   ├── CourtService.java
            │   └── ReservationService.java
            ├── repository/     # DBアクセス層 (Spring Data JPA)
            │   ├── UserRepository.java          # ユーザー検索用Repository
            │   ├── CourtRepository.java
            │   └── ReservationRepository.java
            ├── entity/         # DBテーブル対応エンティティ
            │   ├── User.java
            │   ├── Court.java
            │   └── Reservation.java
            └── dto/            # API通信用オブジェクト (Request/Response)
                ├── request/
                │   ├── LoginRequest.java        # ログインリクエスト（email/password）
                │   └── ReservationSearchRequest.java
                └── response/
                    ├── LoginResponse.java       # ログインレスポンス（ユーザー情報・ロール等）
                    └── ReservationResponse.java