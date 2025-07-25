import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { theme } from "../../../shared/styles/theme";

interface AmountInputProps {
  value: string;
  onChangeAmount: (amount: string) => void;
  style?: ViewStyle;
  placeholder?: string;
  error?: string;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChangeAmount,
  style,
  placeholder = "0",
  error,
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

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.inputContainer, error && styles.inputContainerError]}
        onPress={() => setIsFocused(true)}
        activeOpacity={1}
      >
        <Text style={styles.currencySymbol}>¥</Text>
        <TextInput
          style={[
            styles.amountInput,
            isFocused && styles.amountInputFocused,
            error && styles.amountInputError,
          ]}
          value={displayValue}
          onChangeText={handleChangeText}
          keyboardType="numeric"
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selection={
            isFocused ? { start: value.length, end: value.length } : undefined
          }
          selectionColor={theme.colors.primary}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inputContainerError: {
    borderColor: theme.colors.error,
  },
  currencySymbol: {
    ...theme.typography.h2,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.sm,
  },
  amountInput: {
    ...theme.typography.h1,
    color: theme.colors.text,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    minWidth: 100,
    backgroundColor: "transparent",
  },
  amountInputFocused: {
    color: theme.colors.primary,
  },
  amountInputError: {
    color: theme.colors.error,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
    textAlign: "center",
  },
});
