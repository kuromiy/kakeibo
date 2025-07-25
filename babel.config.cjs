module.exports = function (api) {
  api.cache(true);
  
  // NativeWindのBabelトランスフォーマー
  const plugins = [];
  
  // 本番環境でのみNativeWindを有効化（開発時は既にMetroで処理済み）
  if (process.env.NODE_ENV === 'production') {
    plugins.push('nativewind/babel');
  }
  
  return {
    presets: ["babel-preset-expo"],
    plugins,
  };
};