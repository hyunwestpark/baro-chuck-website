import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import banner1 from "../../assets/banner1.jpg";

const MainBanner = () => {
  const bannerItems = [
    {
      id: 1,
      imageUrl: banner1, // 실제 이미지 경로로 변경 필요
      title: "최상의 의료 서비스",
      description: "환자 중심의 맞춤 의료 시스템",
    },
    {
      id: 2,
      imageUrl: "/banner2.jpg",
      title: "전문 의료진",
      description: "각 분야 전문의가 함께합니다",
    },
    {
      id: 3,
      imageUrl: "/banner3.jpg",
      title: "첨단 의료 장비",
      description: "정확한 진단과 치료를 약속드립니다",
    },
  ];

  return (
    <Carousel className="w-full max-w-7xl mx-auto rounded-lg overflow-hidden">
      <CarouselContent>
        {bannerItems.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[500px] ">
              <div className="absolute inset-0 bg-sky-100 ">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover "
                />
                {/* 텍스트 오버레이 */}
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
                  <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                  <p className="text-xl">{item.description}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2" />
      <CarouselNext className="absolute right-4 top-1/2" />
    </Carousel>
  );
};

export default MainBanner;
