import { Card, CardContent } from "@/components/ui/card";
import intravenous from "../../assets/intravenous.jpg";
import spine from "../../assets/spine.jpg";
import joint from "../../assets/joint.jpg";
import allergy from "../../assets/allergy.jpg";
import therapy from "../../assets/therapy.jpg";

const Treatment = () => {
  const treatments = [
    {
      id: 1,
      name: "수액",
      description: "영양 수액으로 활력 회복",
      image: intravenous, // 실제 이미지 경로로 교체 필요
    },
    {
      id: 2,
      name: "충격파",
      description: "근골격계 통증 치료",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      name: "척추",
      description: "척추 교정 및 통증 치료",
      image: spine,
    },
    {
      id: 4,
      name: "관절",
      description: "관절 통증 및 염증 치료",
      icon: "🦿",
      image: joint,
    },
    {
      id: 5,
      name: "대상포진",
      description: "신경통 치료 및 관리",
      image: allergy,
    },
    {
      id: 6,
      name: "도수치료",
      description: "전문가의 손으로 하는 맞춤 치료",
      image: therapy,
    },
  ];

  return (
    <section className="pt-8 lg:pt-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-12">
          주요 진료 분야
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {treatments.map((treatment) => (
            <Card
              key={treatment.id}
              className="transition-shadow duration-300 hover:shadow-lg"
            >
              <CardContent className="p-0">
                {/* 데스크탑 뷰 */}
                <div className="hidden md:block">
                  <div className="relative">
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg lg:text-xl font-semibold mb-2">
                      {treatment.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {treatment.description}
                    </p>
                  </div>
                </div>

                {/* 모바일 뷰 */}
                <div className="md:hidden">
                  <div className="p-3">
                    <h3 className="text-md font-semibold text-center">
                      {treatment.name}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Treatment;
