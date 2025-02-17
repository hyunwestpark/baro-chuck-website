import { useState, useEffect } from "react";
import { scheduleInfo, notices } from "@/config/scheduleInfo";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export default function Hours() {
  const [isHoliday, setIsHoliday] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 서버에서 휴무일 정보를 가져오는 함수
    const checkHolidayStatus = async () => {
      try {
        // TODO: API 호출로 대체
        // const response = await fetch('/api/holiday-status');
        // const data = await response.json();
        // setIsHoliday(data.isHoliday);

        // 임시로 랜덤값 사용
        setIsHoliday(Math.random() < 0.3);
        setLoading(false);
      } catch (error) {
        console.error("휴무일 정보를 불러오는데 실패했습니다:", error);
        setLoading(false);
      }
    };

    checkHolidayStatus();
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <h1 className="text-3xl font-bold text-center mb-12">진료시간 안내</h1>

        {/* 운영 상태 알림 */}
        {!loading && (
          <ScrollAnimation>
            <div
              className={`mb-8 p-4 rounded-lg text-center ${
                isHoliday
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              <p className="text-lg font-medium">
                {isHoliday
                  ? "오늘은 휴무일입니다."
                  : "오늘은 정상 진료일입니다."}
              </p>
            </div>
          </ScrollAnimation>
        )}

        <ScrollAnimation delay={300}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 진료시간 테이블 */}
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="divide-y">
                {scheduleInfo.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 transition-colors"
                  >
                    <div className="w-44 sm:w-60 font-medium text-gray-900">
                      {schedule.day}
                    </div>
                    <div className="flex-1">
                      <span className="text-lg font-medium text-blue-600">
                        {schedule.hours}
                      </span>
                      {schedule.note && (
                        <span className="ml-2 text-sm text-gray-500">
                          ({schedule.note})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 오른쪽 정보 영역 */}
            <div className="space-y-4">
              {/* 주의사항 */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-blue-900 mb-4">
                  진료 안내
                </h2>
                <ul className="space-y-2">
                  {notices.map((notice, index) => (
                    <li key={index} className="text-blue-800">
                      {notice}
                    </li>
                  ))}
                </ul>
                <h2 className="text-lg font-semibold text-blue-900 my-4">
                  진료 예약 및 상담
                </h2>
                <div className="bg-blue-50">
                  <span className="text-2xl font-bold text-blue-500">
                    02-123-4567
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
