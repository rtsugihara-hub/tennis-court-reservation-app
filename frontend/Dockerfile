FROM node:20-alpine
WORKDIR /app

# パッケージ定義をコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

EXPOSE 5173

# Viteの開発サーバーを外部アクセス許可（--host）で起動
CMD ["npm", "run", "dev", "--", "--host"]