# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

家計簿アプリケーション（React Native + Expo）
- Expo Routerによるファイルベースルーティングを採用
- TypeScriptのstrict modeで開発
- 4フェーズに分けた開発計画で進行中

## 開発コマンド

### 基本コマンド
- `npm start`: Expoサーバーの起動
- `npm run android`: Android向けExpo起動
- `npm run ios`: iOS向けExpo起動  
- `npm run web`: Web向けExpo起動
- `npm run reset-project`: プロジェクトリセット

### コード品質チェック
- `npm run check`: TypeScriptの型チェック（コンパイルなし）
- `npm run lint`: ESLintによるコードリント

**重要**: 作業終了時には必ず `npm run lint` と `npm run check` を実行すること

## アーキテクチャ構造

```
app/          # Expo Routerによるページファイル（ファイルベースルーティング）
features/     # 機能別コンポーネント群
shared/       # 共通コンポーネント・ユーティリティ
styles/       # スタイルファイル
assets/       # 画像・フォント等のアセット
docs/         # プロジェクトドキュメント
scripts/      # 開発用スクリプト
```

### パスエイリアス
- `@/*` → `./*` (tsconfig.jsonで設定済み)

## 技術スタック

### フレームワーク
- React Native 0.79.5
- Expo ~53.0.20
- Expo Router ~5.1.4

### ナビゲーション・UI
- React Navigation (Bottom Tabs, Elements, Native)
- Expo Vector Icons, Expo Symbols
- React Native Gesture Handler, Reanimated

### バリデーション
- Zod 4.0.10

### 開発ツール
- TypeScript 5.8.3 (strict mode有効)
- ESLint (Expo推奨設定)
- Prettier
- Husky (Git hooks)
- Commitlint (conventional commits)

## コード品質管理

### ESLint設定
- Expo推奨設定を使用
- Prettierとの連携設定済み
- `dist/`, `.expo/`, `node_modules/`をignore対象に設定

### Git管理
- Husky + Commitlintによるcommitメッセージ形式チェック
- conventional commitsルールに従う

## 開発上の注意点

### テスト環境
- 現在テストフレームワークは未構築
- `npm test`はプレースホルダー状態
- 将来的にテスト環境の構築が必要

### コミット規約
- conventional commitsに従ったコミットメッセージが必須
- Git hooksにより自動チェックされる