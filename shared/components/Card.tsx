import React from "react";
import { View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = "md",
  className,
}) => {
  // ベースクラス
  const baseClasses = "bg-surface rounded-md shadow-sm";
  
  // パディング別のクラス
  const paddingClasses = {
    xs: "p-1",
    sm: "p-2", 
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
  };

  // 最終的なクラス名を構築
  const cardClassName = [
    baseClasses,
    paddingClasses[padding],
    className,
  ].filter(Boolean).join(" ");

  return (
    <View 
      className={cardClassName}
      style={style}
    >
      {children}
    </View>
  );
};
