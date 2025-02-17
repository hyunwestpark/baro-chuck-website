import { doctorInfo } from "@/config/doctorInfo";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export default function Doctor() {
  return (
    <ScrollAnimation>
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <h1 className="text-3xl font-bold text-center mb-12">의료진 소개</h1>
          {doctorInfo.map((doctor, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border overflow-hidden mb-8 last:mb-0"
            >
              {/* 의사 기본 정보 */}
              <div className="bg-blue-500 text-white p-6">
                <div className="flex items-center gap-6">
                  {/* 프로필 이미지 */}
                  <div className="flex-shrink-0">
                    <img
                      src={doctor.image}
                      alt={`${doctor.name} 원장`}
                      className="w-36 h-36 rounded-full object-cover border-2 border-white shadow-lg"
                    />
                  </div>
                  {/* 텍스트 정보 */}
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {doctor.name} {doctor.role}
                    </h2>
                    <p className="text-blue-100">마취통증의학과 전문의</p>
                  </div>
                </div>
              </div>
              {/* 전문 분야 */}
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-4">전문 분야</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.specialty.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {/* 경력 사항 */}
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-4">경력</h3>
                <div className="space-y-3">
                  {doctor.careers.map((career, idx) => (
                    <div key={idx} className="flex">
                      <span className="text-gray-500 w-24 flex-shrink-0">
                        {career.period}
                      </span>
                      <span className="text-gray-700">
                        {career.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* 학력 */}
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-4">학력</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {doctor.education.map((edu, idx) => (
                    <li key={idx}>{edu}</li>
                  ))}
                </ul>
              </div>
              {/* 자격 및 학회활동 */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">자격 및 학회활동</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {doctor.certifications.map((cert, idx) => (
                    <li key={idx}>{cert}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollAnimation>
  );
}
