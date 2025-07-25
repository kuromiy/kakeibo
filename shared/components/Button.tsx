import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { theme } from "../styles/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "income" | "expense";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  className?: string; // NativeWind対応
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  style,
  textStyle,
  className,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text` as keyof typeof styles],
    styles[`${size}Text` as keyof typeof styles],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      className={className}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.sm,
  },

  // Variants
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  income: {
    backgroundColor: theme.colors.income,
  },
  expense: {
    backgroundColor: theme.colors.expense,
  },

  // Sizes
  sm: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  md: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  lg: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
  },

  // Text styles
  text: {
    fontWeight: "600",
    textAlign: "center",
  },

  // Text variants
  primaryText: {
    color: theme.colors.background,
    fontSize: theme.typography.body.fontSize,
  },
  secondaryText: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
  },
  incomeText: {
    color: theme.colors.background,
    fontSize: theme.typography.body.fontSize,
  },
  expenseText: {
    color: theme.colors.background,
    fontSize: theme.typography.body.fontSize,
  },

  // Text sizes
  smText: {
    fontSize: theme.typography.caption.fontSize,
  },
  mdText: {
    fontSize: theme.typography.body.fontSize,
  },
  lgText: {
    fontSize: theme.typography.h3.fontSize,
  },

  disabledText: {
    opacity: 0.7,
  },
});
