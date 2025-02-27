import React, { useState, useEffect } from "react";
import axios from "axios";

interface HospitalStatusCardProps {
  onDataReady?: () => void;
}

const HospitalStatusCard: React.FC<HospitalStatusCardProps> = ({
  onDataReady,
}) => {
  const [isHoliday, setIsHoliday] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHolidayStatus = async () => {
      try {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 (일요일) ~ 6 (토요일)

        if (dayOfWeek === 0) {
          setIsHoliday(true);
          setLoading(false);
          // 데이터 로딩 완료 신호 전송
          if (onDataReady) onDataReady();
          return;
        }

        const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD 형식
        const response = await axios.get("http://localhost:8080/api/notices");

        const todayHoliday = response.data.some(
          (notice: any) =>
            notice.appliedDate &&
            notice.appliedDate.split("T")[0] === formattedDate
        );

        setIsHoliday(todayHoliday);
        setLoading(false);
        // 데이터 로딩 완료 신호 전송
        if (onDataReady) onDataReady();
      } catch (error) {
        console.error("휴무일 정보를 불러오는데 실패했습니다:", error);
        setLoading(false);
        // 오류가 발생해도 데이터 로딩 완료 신호 전송
        if (onDataReady) onDataReady();
      }
    };

    checkHolidayStatus();
  }, [onDataReady]);

  // 로딩 중일 때 표시할 내용 추가
  if (loading) {
    return (
      <div className="mb-8 p-4 rounded-lg text-center bg-gray-100">
        <p className="text-lg font-medium">진료 정보를 확인 중입니다...</p>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`mb-8 p-4 rounded-lg text-center ${
          isHoliday ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
        }`}
      >
        <p className="text-lg font-medium">
          {isHoliday ? "오늘은 휴무일입니다." : "오늘은 정상 진료일입니다."}
        </p>
      </div>
    </div>
  );
};

export default HospitalStatusCard;
