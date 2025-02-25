import React, { useState, useEffect } from "react";
import MainBanner from "./MainBanner";
import MapSection from "./MapSection";
import TreatmentArea from "./Treatment";
import { ScrollAnimation } from "../../components/ScrollAnimation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Define an interface for the Notice type
interface Notice {
  id: number;
  title: string;
  content: string;
  appliedDate: string;
  createdAt: string;
}

const Home = () => {
  // State for notices and modal
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedNotices, setSelectedNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notices when the component mounts
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch notices from the API
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

        if (topThreeNotices.length > 0) {
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

  // Function to close modal
  const closeNoticesModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
      {/* 기존 컴포넌트들 유지 */}
      <ScrollAnimation>
        <MainBanner />
      </ScrollAnimation>

      <ScrollAnimation animation="fade-up" delay={200}>
        <TreatmentArea />
      </ScrollAnimation>

      <ScrollAnimation animation="fade-up" delay={400}>
        <MapSection />
      </ScrollAnimation>

      {/* 공지사항 모달 */}
      <Dialog open={isModalOpen} onOpenChange={closeNoticesModal}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>공지사항을 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500">{error}</p>
            </div>
          ) : selectedNotices.length > 0 ? (
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {selectedNotices.map((notice) => (
                    <CarouselItem
                      key={notice.id}
                      className="flex justify-center items-center"
                    >
                      <div className="p-8 text-center max-w-xl">
                        <h3 className="text-2xl font-bold mb-4">
                          {notice.title}
                        </h3>
                        <p className="text-gray-600 mb-6 text-lg whitespace-pre-wrap">
                          {notice.content}
                        </p>
                        <div className="text-sm text-gray-500 space-y-2">
                          <p>
                            휴무일:{" "}
                            {new Date(notice.appliedDate).toLocaleDateString()}
                          </p>
                          <p>
                            게시일:{" "}
                            {new Date(notice.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p>공지사항이 없습니다.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
