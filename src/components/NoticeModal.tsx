import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CalendarDays, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export interface Notice {
  id: number;
  title: string;
  content: string;
  appliedDate: string;
  createdAt: string;
}

interface NoticeModalProps {
  notices: Notice[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

const NoticeModal: React.FC<NoticeModalProps> = ({
  notices,
  isOpen,
  isLoading,
  error,
  onClose,
}) => {
  const [doNotShowToday, setDoNotShowToday] = useState(false);

  if (notices.length === 0 && !isLoading && !error) {
    return null;
  }

  const handleCheckboxChange = (checked: boolean) => {
    setDoNotShowToday(checked);

    if (checked) {
      // 로컬 스토리지에 오늘 날짜를 저장
      const today = new Date().toISOString().split("T")[0];
      localStorage.setItem("noticeLastShown", today);

      // 자동으로 모달 닫기
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-lg">
        <div className="bg-white">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">공지사항을 불러오는 중...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="relative">
              <div className="bg-blue-50 py-2 px-4 text-center border-b">
                <h2 className="text-blue-700 font-medium">병원 공지사항</h2>
              </div>

              <Carousel className="w-full">
                <CarouselContent>
                  {notices.map((notice) => (
                    <CarouselItem
                      key={notice.id}
                      className="flex justify-center items-center"
                    >
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-bold mb-3 text-gray-800">
                          {notice.title}
                        </h3>
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <p className="text-gray-700 whitespace-pre-wrap">
                            {notice.content}
                          </p>
                        </div>
                        <div className="flex justify-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4 text-blue-500" />
                            <p>
                              휴무일:{" "}
                              {new Date(
                                notice.appliedDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <p>
                              게시일:{" "}
                              {new Date(notice.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
                <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
              </Carousel>

              <div className="py-2 px-4 border-t flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="doNotShowToday"
                    checked={doNotShowToday}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="doNotShowToday"
                    className="text-sm text-gray-500 cursor-pointer"
                  >
                    오늘 다시 보지 않기
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-sm text-gray-500"
                >
                  닫기
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoticeModal;
