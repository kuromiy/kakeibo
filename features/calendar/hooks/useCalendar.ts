import { useState, useMemo } from 'react';

export interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export const useCalendar = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  // 現在表示中の年月
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // 今日の日付
  const today = new Date();
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  // 選択中の日付かチェック
  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  // カレンダーの日付配列を生成
  const calendarDays = useMemo(() => {
    const days: CalendarDay[] = [];
    
    // 月の最初の日と最後の日
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    
    // 月の最初の日の曜日（0:日曜日 ～ 6:土曜日）
    const firstDayWeekday = firstDayOfMonth.getDay();
    
    // 前月の日付を追加（カレンダーの最初の週を埋める）
    const prevMonth = new Date(currentYear, currentMonth - 1, 0);
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - 1, prevMonth.getDate() - i);
      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth: false,
        isToday: isToday(date),
        isSelected: isSelected(date),
      });
    }
    
    // 当月の日付を追加
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(currentYear, currentMonth, day);
      days.push({
        date,
        day,
        isCurrentMonth: true,
        isToday: isToday(date),
        isSelected: isSelected(date),
      });
    }
    
    // 次月の日付を追加（カレンダーの最後の週を埋める）
    const remainingDays = 42 - days.length; // 6週間 × 7日 = 42日
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(currentYear, currentMonth + 1, day);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: isToday(date),
        isSelected: isSelected(date),
      });
    }
    
    return days;
  }, [currentYear, currentMonth, selectedDate]);

  // 前月に移動
  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // 次月に移動
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // 今月に移動
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // 日付を選択
  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  // 月名を取得
  const getMonthName = () => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long'
    }).format(currentDate);
  };

  // 曜日の配列
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

  return {
    calendarDays,
    selectedDate,
    currentDate,
    weekDays,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    getMonthName,
  };
};