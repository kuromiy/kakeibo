/**
 * 一意のIDを生成するユーティリティ関数
 * タイムスタンプベースで重複を避ける
 */
export const generateId = (): string => {
  const timestamp = Date.now().toString();
  const randomPart = Math.random().toString(36).substring(2, 9);
  return `${timestamp}_${randomPart}`;
};

/**
 * より短いIDを生成する関数（表示用）
 */
export const generateShortId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * 数値のみのIDを生成する関数
 */
export const generateNumericId = (): string => {
  return Date.now().toString();
};