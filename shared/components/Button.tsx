import React from "react";
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "income" | "expense";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  className?: string;
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
  // ベースクラス
  const baseClasses = "rounded-md items-center justify-center shadow-sm active:opacity-70";
  
  // バリアント別のクラス
  const variantClasses = {
    primary: "bg-primary",
    secondary: "bg-surface border border-border",
    income: "bg-income",
    expense: "bg-expense",
  };

  // サイズ別のクラス
  const sizeClasses = {
    sm: "py-1 px-2",
    md: "py-2 px-4",
    lg: "py-4 px-6",
  };

  // テキストバリアント別のクラス
  const textVariantClasses = {
    primary: "text-background",
    secondary: "text-text",
    income: "text-background",
    expense: "text-background",
  };

  // テキストサイズ別のクラス
  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  // 最終的なクラス名を構築
  const buttonClassName = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && "opacity-50",
    className,
  ].filter(Boolean).join(" ");

  const textClassName = [
    "font-semibold text-center",
    textVariantClasses[variant],
    textSizeClasses[size],
    disabled && "opacity-70",
  ].filter(Boolean).join(" ");

  return (
    <TouchableOpacity
      className={buttonClassName}
      style={style}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text className={textClassName} style={textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
