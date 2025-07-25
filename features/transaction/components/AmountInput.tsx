import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface AmountInputProps {
  value: string;
  onChangeAmount: (amount: string) => void;
  style?: ViewStyle;
  placeholder?: string;
  error?: string;
  className?: string;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChangeAmount,
  style,
  placeholder = "0",
  error,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // 数値をフォーマット（カンマ区切り）
  const formatNumber = (num: string) => {
    if (!num || num === "0") return "0";
    return parseInt(num.replace(/,/g, "")).toLocaleString();
  };

  // 入力値を数値のみに制限
  const handleChangeText = (text: string) => {
    // 数値以外を除去
    const numericValue = text.replace(/[^0-9]/g, "");
    onChangeAmount(numericValue);
  };

  const displayValue = value ? formatNumber(value) : placeholder;

  // Tailwindクラス定義
  const containerClassName = [
    "w-full",
    className,
  ].filter(Boolean).join(" ");

  const inputContainerClassName = [
    "flex-row items-center justify-center py-6 bg-background rounded-md border",
    error ? "border-error" : "border-border",
  ].join(" ");

  const currencySymbolClassName = "text-2xl text-textSecondary mr-2";

  const amountInputClassName = [
    "text-4xl font-bold text-center min-w-25 bg-transparent",
    isFocused 
      ? "text-primary" 
      : error 
        ? "text-error" 
        : "text-text",
  ].join(" ");

  const errorTextClassName = "text-sm text-error mt-1 text-center";

  return (
    <View className={containerClassName} style={style}>
      <TouchableOpacity
        className={inputContainerClassName}
        onPress={() => setIsFocused(true)}
        activeOpacity={1}
      >
        <Text className={currencySymbolClassName}>¥</Text>
        <TextInput
          className={amountInputClassName}
          value={isFocused ? value : displayValue}
          onChangeText={handleChangeText}
          keyboardType="numeric"
          placeholder={placeholder}
          placeholderTextColor="#CCCCCC" // theme.colors.textSecondary
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selection={
            isFocused ? { start: value.length, end: value.length } : undefined
          }
          selectionColor="#FFD700" // theme.colors.primary
        />
      </TouchableOpacity>
      {error && <Text className={errorTextClassName}>{error}</Text>}
    </View>
  );
};
