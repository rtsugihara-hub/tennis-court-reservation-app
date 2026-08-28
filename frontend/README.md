# Frontend (React + TypeScript + Vite)

テニスコート予約システムのフロントエンドアプリケーションです。

## ディレクトリ構成

```text
frontend/
├── Dockerfile                  # Dockerビルド設定
├── package.json                # パッケージ依存関係
├── vite.config.ts              # Vite設定ファイル
└── src/
    ├── main.tsx                # アプリケーションエントリーポイント
    ├── App.tsx                 # ルーティング（画面遷移）定義
    ├── index.css               # グローバルスタイル
    ├── api/                    # API通信処理
    │   ├── axiosClient.ts      # Axios設定（ベースURL・共通ヘッダー等）
    │   ├── reservationApi.ts   # 予約関連API呼び出し関数
    │   └── courtApi.ts         # コート関連API呼び出し関数
    ├── components/             # 共通UIコンポーネント
    │   ├── Header.tsx          # ヘッダー
    │   ├── Sidebar.tsx         # サイドバー/ナビゲーション
    │   └── StatusBadge.tsx     # ステータス表示用バッジ
    ├── pages/                  # 各画面コンポーネント
    │   ├── Login.tsx           # P00. 共通ログイン画面
    │   ├── Dashboard.tsx       # P01. ダッシュボード画面
    │   ├── CourtList.tsx       # P02. コート検索・一覧画面
    │   ├── CourtDetail.tsx     # P03-P06. コート詳細・予約申し込み画面
    │   ├── MyPage.tsx          # P07-P08. 予約履歴・マイページ画面
    │   └── admin/              # 管理者専用画面
    │       ├── AdminReservationList.tsx # P10. 管理者用予約受付一覧画面
    │       └── AdminCourtList.tsx       # P09. 管理者用コート管理画面
    ├── types/                  # TypeScript型定義
    │   ├── reservation.ts      # 予約データ型定義
    │   └── court.ts            # コートデータ型定義
    └── mocks/                  # モックデータ
        └── mockData.ts         # 画面確認用のダミーデータ