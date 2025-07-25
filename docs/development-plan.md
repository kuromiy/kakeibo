# 家計簿アプリ開発 詳細作業計画

## フェーズ1: 基本家計簿機能（MVP）

### 1.1 プロジェクト初期設定（1-2日）
- React Native/Expo環境構築
- プロジェクト構成設計
- ESLint/Prettier設定
- GitHubリポジトリ設定

### 1.2 データベース設計・実装（2-3日）
- SQLiteスキーマ設計（transactions, categories）
- データベース初期化処理
- CRUD操作の基本関数実装
- マイグレーション機能

### 1.3 基本UI/UXセットアップ（1-2日）
- ナビゲーション構造設計
- 共通コンポーネント作成（Button, Input, Card）
- テーマ・スタイル設定
- フォント・アイコン設定

### 1.4 ホーム画面実装（2-3日）
- ホーム画面レイアウト
- 今日・今月の収支計算ロジック
- 最近の取引履歴表示（5件）
- クイック入力ボタン配置

### 1.5 手動入力画面実装（3-4日）
- 入力フォーム作成（金額、カテゴリ、日付、メモ）
- 収入/支出切り替え機能
- バリデーション処理
- データ保存・画面遷移
- 入力エラーハンドリング

### 1.6 基本履歴画面実装（2-3日）
- 取引一覧表示
- 日付順ソート機能
- 収支表示の色分け
- プルツーリフレッシュ

### 1.7 デフォルトカテゴリ設定（1日）
- 基本カテゴリマスタデータ作成
- カテゴリアイコン素材準備
- カテゴリ初期データ投入

### 1.8 テスト・デバッグ（2-3日）
- 基本機能テスト
- エラーケーステスト
- デバイス動作確認

**フェーズ1総期間**: 14-20日（3-4週間）

---

## フェーズ2: データ管理・カスタマイズ機能

### 2.1 詳細履歴画面実装（3-4日）
- 期間選択UI（日別・週別・月別）
- カテゴリフィルター機能
- 期間別データ取得ロジック
- パフォーマンス最適化

### 2.2 データ編集機能実装（2-3日）
- 取引詳細画面
- 編集フォーム
- 削除確認ダイアログ
- データ更新・削除処理

### 2.3 カテゴリ管理画面実装（3-4日）
- カテゴリ一覧表示
- 新規カテゴリ作成フォーム
- カテゴリ編集・削除機能
- アイコン選択UI
- カスタムカテゴリDB設計

### 2.4 基本集計機能実装（2-3日）
- 月間収支計算ロジック
- カテゴリ別支出集計
- 集計データ表示UI
- 期間指定集計

### 2.5 入力補助機能実装（2日）
- よく使うカテゴリ表示
- 最近の履歴からクイック選択
- 入力履歴管理

### 2.6 テスト・リファクタリング（2日）
- 機能テスト
- コード整理
- パフォーマンス確認

**フェーズ2総期間**: 12-16日（2.5-3週間）

---

## フェーズ3: レシート自動入力機能

### 3.1 カメラ機能実装（2-3日）
- カメラ権限処理
- カメラビュー実装
- 撮影・保存機能
- ギャラリー選択機能

### 3.2 画像処理機能実装（3-4日）
- 画像トリミング機能
- 傾き補正処理
- 明度・コントラスト調整
- 画像圧縮・最適化

### 3.3 OCR機能実装（4-5日）
- OCR APIサービス選定・導入
- 合計金額抽出ロジック
- 日時認識処理
- 商品明細読み取り（基本）
- エラーハンドリング

### 3.4 OCR結果確認画面実装（3-4日）
- 撮影画像表示
- 認識結果表示・編集UI
- 手動修正機能
- カテゴリ自動推定ロジック

### 3.5 レシート撮影フロー実装（2-3日）
- 画面遷移フロー
- 進捗表示
- キャンセル・リトライ機能
- データ保存処理

### 3.6 テスト・最適化（3-4日）
- 各種レシート形式テスト
- OCR精度検証
- パフォーマンス最適化
- エラーケース対応

**フェーズ3総期間**: 17-23日（3.5-4.5週間）

---

## フェーズ4: 高度な分析・設定機能

### 4.1 グラフ表示機能実装（3-4日）
- Chart.jsライブラリ導入
- 円グラフ実装（カテゴリ別支出）
- 棒グラフ実装（月別推移）
- 前月比較表示

### 4.2 設定画面実装（2-3日）
- 設定画面レイアウト
- 通知設定UI
- データバックアップ設定
- アプリ情報表示

### 4.3 通知機能実装（2-3日）
- プッシュ通知設定
- リマインダー機能
- 通知スケジュール管理
- 通知権限処理

### 4.4 電卓機能実装（1-2日）
- 計算機UI
- 計算ロジック
- 入力画面との連携

### 4.5 検索機能実装（2-3日）
- 検索UI
- 検索条件設定
- 検索結果表示
- 検索履歴保存

### 4.6 データバックアップ機能実装（2-3日）
- エクスポート機能
- インポート機能
- クラウド連携（基本）

### 4.7 最終テスト・調整（3-4日）
- 総合テスト
- UIデザイン調整
- パフォーマンス最適化
- リリース準備

**フェーズ4総期間**: 15-21日（3-4週間）

---

## プロジェクト全体スケジュール

### 技術スタック想定
- **フロントエンド**: React Native / Expo
- **データベース**: SQLite
- **状態管理**: Redux Toolkit or Context API
- **ナビゲーション**: React Navigation
- **OCR**: Google Vision API or AWS Textract
- **グラフ**: Chart.js or Victory Native
- **アイコン**: Expo Vector Icons

### 開発上の留意点
1. 各フェーズ終了時にユーザビリティテストを実施
2. データベース設計は拡張性を考慮して設計
3. OCR機能は外部API利用のためコスト・精度を検証  
4. レスポンシブデザインとアクセシビリティ対応
5. セキュリティ（データ暗号化、権限管理）の考慮