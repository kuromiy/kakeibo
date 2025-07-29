# NativeWind使用ガイド

このプロジェクトではNativeWind v4を導入し、既存のStyleSheetとの併用が可能です。

## 🎨 利用可能なカスタムクラス

### カラー
```tsx
// 背景色
className="bg-primary"     // ゴールド (#FFD700)
className="bg-secondary"   // ダークブラック (#1C1C1C) 
className="bg-background"  // ダークブラック (#0A0A0A)
className="bg-surface"     // グレーブラック (#1A1A1A)
className="bg-income"      // 収入色 (#FFD700)
className="bg-expense"     // 支出色 (#FFA500)
className="bg-success"     // 成功色 (#32D74B)
className="bg-error"       // エラー色 (#FF6B6B)

// テキスト色
className="text-primary"      // ゴールド
className="text-text"         // 白色 (#FFFFFF)
className="text-textSecondary" // ライトグレー (#CCCCCC)
className="text-background"   // 背景色（ダーク）
```

### スペーシング
```tsx
// パディング
className="p-1"    // 4px (xs)
className="p-2"    // 8px (sm)  
className="p-4"    // 16px (md)
className="p-6"    // 24px (lg)
className="p-8"    // 32px (xl)

// マージン
className="m-1 m-2 m-4 m-6 m-8"  // 同様の値
className="mx-4"   // marginHorizontal
className="my-4"   // marginVertical
```

### ボーダーラディウス
```tsx
className="rounded-sm"  // 4px
className="rounded-md"  // 8px
className="rounded-lg"  // 12px  
className="rounded-xl"  // 16px
```

### フォントサイズ
```tsx
className="text-h1"      // 32px, bold
className="text-h2"      // 24px, bold
className="text-h3"      // 20px, semibold
className="text-body"    // 16px, normal
className="text-caption" // 14px, normal
className="text-small"   // 12px, normal
```

## 🔧 ハイブリッド使用例

### Buttonコンポーネント
```tsx
// 従来の方法
<Button 
  title="保存" 
  variant="primary" 
  size="lg"
/>

// NativeWind併用
<Button 
  title="保存" 
  variant="primary" 
  className="shadow-lg rounded-xl"
/>
```

### Cardコンポーネント
```tsx
// 従来の方法  
<Card style={customStyle}>
  <Text>コンテンツ</Text>
</Card>

// NativeWind併用
<Card className="shadow-md border border-primary">
  <Text>コンテンツ</Text>
</Card>
```

## 📱 レスポンシブ対応

NativeWindは自動的にデバイスサイズに対応します：

```tsx
<View className="p-4 sm:p-6 lg:p-8">
  {/* 画面サイズによってパディングが変化 */}
</View>
```

## ⚠️ 注意事項

1. **既存のStyleSheetとの併用**: 両方を同時に使用可能
2. **パフォーマンス**: NativeWindは本番ビルド時に最適化される
3. **型安全性**: classNameプロパティはTypeScriptで型チェック済み

## 🚀 推奨事項

- **新規開発**: NativeWindを積極的に活用
- **既存修正**: 大きな変更が不要な場合は既存StyleSheetを維持
- **複雑なスタイル**: StyleSheetで詳細制御、NativeWindで基本スタイル