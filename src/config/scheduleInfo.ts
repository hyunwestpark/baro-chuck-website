interface TimeSchedule {
  day: string;
  hours: string;
  note?: string;
}

export const scheduleInfo: TimeSchedule[] = [
  { day: "월요일, 화요일, 목요일, 금요일", hours: "09:00 - 16:00" },
  { day: "수요일, 토요일", hours: "09:00 - 13:00" },
  { day: "점심시간", hours: "13:00 - 14:00" },
  { day: "일요일/공휴일", hours: "휴진" },
];

export const notices = [
  "* 공휴일은 휴진입니다.",
  "* 응급상황 시 연락주시면 최대한 도와드리겠습니다.",
];
