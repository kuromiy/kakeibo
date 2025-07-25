import React from "react";
import {
  View,
  Text,
  TextInput,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from "react-native";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  error?: string;
  required?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  className?: string;
  inputClassName?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  editable = true,
  error,
  required = false,
  style,
  inputStyle,
  className,
  inputClassName,
}) => {
  // コンテナクラス
  const containerClassName = [
    "mb-4",
    className,
  ].filter(Boolean).join(" ");

  // ラベルコンテナクラス
  const labelContainerClassName = "flex-row items-center mb-2";

  // ラベルクラス
  const labelClassName = "text-base font-semibold text-text";

  // 必須マーククラス
  const requiredClassName = "text-error text-base ml-1";

  // インプットクラス
  const inputBaseClassName = "text-base text-text bg-background border border-border rounded-md py-2 px-4 min-h-12";
  const inputMultilineClassName = multiline ? "min-h-20 pt-2" : "";
  const inputErrorClassName = error ? "border-error" : "";
  const inputDisabledClassName = !editable ? "bg-surface opacity-70" : "";

  const finalInputClassName = [
    inputBaseClassName,
    inputMultilineClassName,
    inputErrorClassName,
    inputDisabledClassName,
    inputClassName,
  ].filter(Boolean).join(" ");

  // エラーテキストクラス
  const errorTextClassName = "text-sm text-error mt-1";

  return (
    <View className={containerClassName} style={style}>
      <View className={labelContainerClassName}>
        <Text className={labelClassName}>{label}</Text>
        {required && <Text className={requiredClassName}>*</Text>}
      </View>

      <TextInput
        className={finalInputClassName}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#CCCCCC" // theme.colors.textSecondary
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        editable={editable}
        selectionColor="#FFD700" // theme.colors.primary
        textAlignVertical={multiline ? "top" : "center"}
      />

      {error && <Text className={errorTextClassName}>{error}</Text>}
    </View>
  );
};
