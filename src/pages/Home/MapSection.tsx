import { useEffect } from "react";
import {
  hospitalInfo,
  TransportItem,
  InfoItem,
} from "../../config/hospitalInfo";

declare global {
  interface Window {
    kakao: any;
  }
}

const MapSection = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY
    }&autoload=false`;

    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map");

        const coords = new window.kakao.maps.LatLng(
          37.5890512143102,
          127.00492740484
        );

        const options = {
          center: coords,
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        const marker = new window.kakao.maps.Marker({
          position: coords,
        });
        marker.setMap(map);

        const content =
          '<div class="bg-white px-2 py-1 rounded border-2 border-gray-300">' +
          "바로척마취통증의학과</div>";
        new window.kakao.maps.CustomOverlay({
          map: map,
          position: coords,
          content: content,
          yAnchor: 2.3,
        });
      }
    };

    script.onload = () => {
      window.kakao.maps.load(loadKakaoMap);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const renderContent = (info: InfoItem) => {
    if (info.isTransport) {
      return (info.content as TransportItem[]).map((item, idx) => (
        <div key={idx} className="flex flex-col mb-1 last:mb-0 ">
          <div className="flex items-center mb-1">
            <span
              className={`
              ${item.type === "subway" ? "bg-[#00A4E3]" : "bg-[#0068b7]"}
              text-white
              px-3 py-1
              w-16
              rounded
              text-sm
              inline-block
              text-center
            `}
            >
              {item.text}
            </span>
            <p className="text-gray-700 ml-2">{item.description}</p>
          </div>
        </div>
      ));
    }

    return (info.content as string[]).map((text, idx) => (
      <p key={idx} className="text-gray-700">
        {text}
      </p>
    ));
  };

  return (
    <section className="py-8 lg:py-16 max-w-7xl mx-auto">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 sm:mb-12">
        오시는 길
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 지도 영역 */}
        <div className="lg:w-[70%]">
          <div
            id="map"
            className="w-full h-[250px] sm:h-[350px] lg:h-[450px] rounded-lg shadow-sm"
          ></div>
        </div>

        {/* 정보 영역 */}
        <div className="lg:w-[30%]">
          {/* 모바일 뷰 */}
          <div className="block lg:hidden overflow-x-auto pb-4 ">
            <div className="flex gap-4 min-w-max">
              {hospitalInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex-none w-[280px] bg-white rounded-lg border p-4"
                >
                  <h3 className="font-bold text-lg text-blue-600 mb-3">
                    {info.title}
                  </h3>
                  {renderContent(info)}
                </div>
              ))}
            </div>
          </div>

          {/* 데스크톱 뷰 */}
          <div className="hidden lg:block space-y-6 p-4 rounded-lg">
            {hospitalInfo.map((info, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-500 pl-4 transition-all duration-200 p-3"
              >
                <h3 className="font-bold text-lg mb-2 text-blue-600">
                  {info.title}
                </h3>
                {renderContent(info)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-4 lg:hidden">
        ← 좌우로 스와이프하여 더 많은 정보를 확인하세요 →
      </p>
    </section>
  );
};

export default MapSection;
