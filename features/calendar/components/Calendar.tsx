import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useCalendar, CalendarDay } from "../hooks/useCalendar";

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  style?: ViewStyle;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  style,
  className,
}) => {
  const {
    calendarDays,
    weekDays,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    getMonthName,
  } = useCalendar(selectedDate);

  const handleDatePress = (day: CalendarDay) => {
    selectDate(day.date);
    onDateSelect(day.date);
  };

  const renderDay = (day: CalendarDay, index: number) => {
    // 日付セルのクラス
    const dayCellClassName = [
      "justify-center items-center rounded",
      "opacity-30", // デフォルトは月外なので薄く
      day.isCurrentMonth && "opacity-100",
      day.isToday && "bg-primary",
      day.isSelected && "bg-income",
    ].filter(Boolean).join(" ");

    // 日付テキストのクラス  
    const dayTextClassName = [
      "text-base",
      day.isCurrentMonth ? "text-text" : "text-textSecondary",
      (day.isToday || day.isSelected) && "text-background font-bold",
    ].filter(Boolean).join(" ");

    return (
      <TouchableOpacity
        key={index}
        className={dayCellClassName}
        style={{ width: "14.28%", height: 40 }} // 7分の1の幅
        onPress={() => handleDatePress(day)}
        activeOpacity={0.7}
      >
        <Text className={dayTextClassName}>{day.day}</Text>
      </TouchableOpacity>
    );
  };

  // コンテナクラス
  const containerClassName = [
    "bg-surface rounded-md p-4",
    className,
  ].filter(Boolean).join(" ");

  // ヘッダーレイアウトクラス
  const headerClassName = "flex-row justify-between items-center mb-4";
  
  // ナビゲーションボタンクラス
  const navButtonClassName = "w-10 h-10 rounded-full bg-background justify-center items-center";
  
  // ナビゲーションボタンテキストクラス
  const navButtonTextClassName = "text-lg text-text";
  
  // 月ボタンクラス
  const monthButtonClassName = "py-2 px-4 rounded";
  
  // 月テキストクラス
  const monthTextClassName = "text-xl font-bold text-text";
  
  // 曜日ヘッダークラス
  const weekDaysHeaderClassName = "flex-row mb-2";
  
  // 曜日セルクラス
  const weekDayCellClassName = "flex-1 h-8 justify-center items-center";
  
  // カレンダーグリッドクラス
  const calendarGridClassName = "flex-row flex-wrap";

  return (
    <View className={containerClassName} style={style}>
      {/* ヘッダー（月名と前/次ボタン） */}
      <View className={headerClassName}>
        <TouchableOpacity
          className={navButtonClassName}
          onPress={goToPrevMonth}
          activeOpacity={0.7}
        >
          <Text className={navButtonTextClassName}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={monthButtonClassName}
          onPress={goToToday}
          activeOpacity={0.7}
        >
          <Text className={monthTextClassName}>{getMonthName()}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={navButtonClassName}
          onPress={goToNextMonth}
          activeOpacity={0.7}
        >
          <Text className={navButtonTextClassName}>→</Text>
        </TouchableOpacity>
      </View>

      {/* 曜日ヘッダー */}
      <View className={weekDaysHeaderClassName}>
        {weekDays.map((weekDay, index) => (
          <View key={index} className={weekDayCellClassName}>
            <Text
              className="text-sm font-semibold text-textSecondary"
              style={{
                color: index === 0 ? "#FF6B6B" : index === 6 ? "#4DABF7" : "#CCCCCC"
              }}
            >
              {weekDay}
            </Text>
          </View>
        ))}
      </View>

      {/* カレンダーグリッド */}
      <View className={calendarGridClassName}>
        {calendarDays.map((day, index) => renderDay(day, index))}
      </View>
    </View>
  );
};
