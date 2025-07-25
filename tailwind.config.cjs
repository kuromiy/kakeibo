/** @type {import('tailwindcss').Config} */
module.exports = {
  // 実際のディレクトリ構造に合わせたcontentパス
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}", 
    "./shared/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // 既存テーマシステムからの色定義
      colors: {
        primary: '#FFD700',
        secondary: '#1C1C1C',
        background: '#0A0A0A',
        surface: '#1A1A1A',
        text: '#FFFFFF',
        textSecondary: '#CCCCCC',
        border: '#333333',
        income: '#FFD700',
        expense: '#FFA500',
        success: '#32D74B',
        warning: '#FFD700',
        error: '#FF6B6B',
      },
      // 既存テーマシステムからのスペーシング定義
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      // 既存テーマシステムからのボーダーラディウス定義
      borderRadius: {
        sm: '4px',
        md: '8px', 
        lg: '12px',
        xl: '16px',
      },
      // 既存テーマシステムからのフォントサイズ定義
      fontSize: {
        'h1': ['32px', { lineHeight: '40px', fontWeight: 'bold' }],
        'h2': ['24px', { lineHeight: '32px', fontWeight: 'bold' }],
        'h3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: 'normal' }],
        'caption': ['14px', { lineHeight: '20px', fontWeight: 'normal' }],
        'small': ['12px', { lineHeight: '16px', fontWeight: 'normal' }],
      }
    },
  },
  plugins: [],
}