import React, { useState, useEffect, lazy, Suspense } from "react";
import { ScrollAnimation } from "../../components/ScrollAnimation";

const HospitalStatusCard = lazy(
  () => import("@/components/HospitalStatusCard")
);
const MainBanner = lazy(() => import("./MainBanner"));
const MapSection = lazy(() => import("./MapSection"));
const TreatmentArea = lazy(() => import("./Treatment"));
const NoticeModal = lazy(() => import("../../components/NoticeModal"));

interface Notice {
  id: number;
  title: string;
  content: string;
  appliedDate: string;
  createdAt: string;
}

const Home = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotices, setSelectedNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hospitalDataReady, setHospitalDataReady] = useState(false);

  // localStorage 체크 함수
  const checkDoNotShowToday = () => {
    try {
      const lastShown = localStorage.getItem("noticeLastShown");
      const today = new Date().toISOString().split("T")[0];
      return lastShown === today;
    } catch (error) {
      console.error("localStorage 확인 중 오류:", error);
      return false;
    }
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:8080/api/notices");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const sortedNotices = data.sort(
          (a: Notice, b: Notice) =>
            new Date(a.appliedDate).getTime() -
            new Date(b.appliedDate).getTime()
        );

        const topThreeNotices = sortedNotices.slice(0, 3);

        setNotices(sortedNotices);
        setSelectedNotices(topThreeNotices);
        setIsLoading(false);

        // "오늘 다시 보지 않기" 설정이 없고 공지사항이 있을 경우에만 모달 열기
        if (topThreeNotices.length > 0 && !checkDoNotShowToday()) {
          setIsModalOpen(true);
        }
      } catch (err) {
        setError("공지사항을 불러오는 중 오류가 발생했습니다.");
        setIsLoading(false);
        console.error("Error fetching notices:", err);
      }
    };

    fetchNotices();
  }, []);

  const closeNoticesModal = () => {
    setIsModalOpen(false);
  };

  const handleHospitalDataReady = () => {
    setHospitalDataReady(true);
  };

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
      <ScrollAnimation>
        <Suspense fallback={<div>병원 상태 정보를 불러오는 중...</div>}>
          <HospitalStatusCard onDataReady={handleHospitalDataReady} />
        </Suspense>
      </ScrollAnimation>

      {hospitalDataReady && (
        <>
          <ScrollAnimation delay={250}>
            <Suspense fallback={<div>배너를 불러오는 중...</div>}>
              <MainBanner />
            </Suspense>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={300}>
            <Suspense fallback={<div>진료 정보를 불러오는 중...</div>}>
              <TreatmentArea />
            </Suspense>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={400}>
            <Suspense fallback={<div>지도 정보를 불러오는 중...</div>}>
              <MapSection />
            </Suspense>
          </ScrollAnimation>
        </>
      )}

      {/* 공지사항 모달 - 별도 컴포넌트로 분리 */}
      <Suspense fallback={<div>공지사항을 불러오는 중...</div>}>
        <NoticeModal
          notices={selectedNotices}
          isOpen={isModalOpen}
          isLoading={isLoading}
          error={error}
          onClose={closeNoticesModal}
        />
      </Suspense>
    </div>
  );
};

export default Home;
