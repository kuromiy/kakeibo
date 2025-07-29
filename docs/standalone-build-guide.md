# スタンドアロンビルドガイド（EAS不使用）

## 概要

このガイドでは、EAS（Expo Application Services）を使用せずに、開発サーバー不要のスタンドアロンバイナリを作成する方法を説明します。この方法は、Maestroテストなどの自動テスト環境に最適です。

## 前提条件

- Expo開発環境が構築済み
- Androidエミュレーターまたは実機が利用可能
- `expo-dev-client`がインストール済み

## ビルド方法

### 方法1: Expo Export + Gradle Build（推奨）

#### 1. アプリのエクスポート
```bash
# JavaScriptバンドルを静的ファイルとして出力
npx expo export --platform android
```

#### 2. リリースビルドの作成
```bash
# Androidプロジェクトでリリースビルド
cd android
./gradlew assembleRelease
```

#### 3. APKファイルの確認
生成されたAPKファイルの場所：
```
android/app/build/outputs/apk/release/app-release.apk
```

### 方法2: Expo Run Android（リリースモード）

```bash
# リリース版で一括ビルド・インストール
npx expo run:android --variant release
```

### 方法3: 手動Gradleビルド

```bash
# 1. prebuildでネイティブコード生成を確実に実行
npx expo prebuild --platform android

# 2. Gradleで直接ビルド
cd android
./gradlew assembleRelease
```

## インストール手順

### 1. 既存アプリのアンインストール
```bash
# 開発ビルドを削除
adb uninstall com.kakeibo.app
```

### 2. スタンドアロンAPKのインストール
```bash
# APKファイルをインストール
adb install android/app/build/outputs/apk/release/app-release.apk
```

または、エミュレータにドラッグ&ドロップでも可能。

### 3. インストール確認
```bash
# インストール済みパッケージの確認
adb shell pm list packages | grep kakeibo
```

## Maestroテスト設定

### 1. パッケージ名の確認

#### エミュレータから確認
1. アプリを長押し → **App info**
2. アプリの詳細画面でパッケージ名を確認

#### adbコマンドで確認
```bash
adb shell pm list packages | grep kakeibo
```

### 2. Maestro設定ファイルの更新

`.maestro/launch.yaml`を確認したパッケージ名で更新：

```yaml
appId: com.kakeibo.app  # 実際のパッケージ名に変更
---
- launchApp
- assertVisible: "家計簿"
- assertVisible: "今日の収支"
- assertVisible: "今月の収支"
- assertVisible: "最近の取引"
```

### 3. テスト実行

```bash
# 開発サーバー不要でテスト実行
npm run maestro:test
```

## トラブルシューティング

### アプリが起動しない場合

1. **パッケージ名の確認**
   - `.maestro/launch.yaml`のappIdが正しいか確認
   - エミュレータのApp Infoで実際のパッケージ名を確認

2. **アプリのインストール状態確認**
   ```bash
   adb shell pm list packages | grep kakeibo
   ```

3. **アプリの手動起動テスト**
   - エミュレータから手動でアプリを起動
   - 正常に動作するか確認

### ビルドエラーの場合

1. **キャッシュのクリア**
   ```bash
   npx expo start --clear
   rm -rf node_modules
   npm install
   ```

2. **Gradleキャッシュのクリア**
   ```bash
   cd android
   ./gradlew clean
   ```

3. **prebuildの再実行**
   ```bash
   npx expo prebuild --clean --platform android
   ```

### Maestroテストが失敗する場合

1. **データ読み込み待機の追加**
   
   アプリ起動時にデータベースからの読み込みがある場合、待機時間を追加：
   
   ```yaml
   appId: com.kakeibo.app
   ---
   - launchApp
   - extendedWaitUntil:
       visible: "家計簿"
       timeout: 15000
   - assertVisible: "今日の収支"
   - assertVisible: "今月の収支"
   - assertVisible: "最近の取引"
   ```

2. **アプリの状態確認**
   - エミュレータでアプリが正常に表示されているか確認
   - ローディング状態が続いていないか確認

## 利点

- **開発サーバー不要**: 完全に独立したアプリでテスト可能
- **本番環境に近い**: リリースビルドでのテスト実行
- **CI/CD対応**: 自動化されたテスト環境に最適
- **EAS不要**: クラウドサービスを使わずローカル完結

## 注意事項

- リリースビルドはデバッグ情報が含まれないため、開発時の詳細なエラー情報は取得できません
- アプリの更新時は、再度ビルド・インストールが必要です
- 初回ビルドには時間がかかる場合があります

## まとめ

この方法により、EASを使用せずに開発サーバー不要のスタンドアロンバイナリを作成し、Maestroテストを実行できます。特にCI/CDパイプラインでの自動テスト実行に有効です。