export const colors = {
  primary: '#FFD700',      // ゴールド/黄色（メインアクション）
  secondary: '#1C1C1C',    // ダークブラック（セカンダリ）
  background: '#0A0A0A',   // ダークブラック（背景）
  surface: '#1A1A1A',      // グレーブラック（カード背景）
  text: '#FFFFFF',         // 白色（メインテキスト）
  textSecondary: '#CCCCCC', // ライトグレー（サブテキスト）
  border: '#333333',       // ダークグレー（ボーダー）
  income: '#FFD700',       // ゴールド（収入表示）
  expense: '#FFA500',      // オレンジ（支出表示）
  success: '#32D74B',      // グリーン（成功）
  warning: '#FFD700',      // イエロー（警告）
  error: '#FF6B6B',        // ソフトレッド（エラー）
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
  },
} as const

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
} as const

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
} as const

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
} as const

export type Theme = typeof theme