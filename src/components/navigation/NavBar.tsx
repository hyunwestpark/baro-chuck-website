import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LocationHoverCard } from "./LocationHoverCard";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 병원 정보
  const hospitalName = "바로척마취통증의학과";
  const hospitalLat = "37.5890512143102";
  const hospitalLng = "127.00492740484";

  const menus = [
    { name: "홈", path: "/home" },
    { name: "의료진 소개", path: "/doctor" },
    { name: "진료시간", path: "/hours" },
    { name: "오시는 길", path: "/location", isHighlighted: true },
  ];

  const handleNavigation = (path: string) => {
    if (path === "/location") {
      const kakaoMapUrl = `https://map.kakao.com/link/to/${hospitalName},${hospitalLat},${hospitalLng}`;
      window.open(kakaoMapUrl, "_blank");
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const renderMenuItem = (menu: (typeof menus)[0], idx: number) => {
    if (menu.path === "/location") {
      return (
        <LocationHoverCard key={idx}>
          <Button
            variant={menu.isHighlighted ? "blue" : "ghost"}
            onClick={() => handleNavigation(menu.path)}
            className={`${
              location.pathname === menu.path ? "bg-gray-100" : ""
            } flex items-center gap-2`}
          >
            {menu.name}
          </Button>
        </LocationHoverCard>
      );
    }

    return (
      <Button
        key={idx}
        variant={menu.isHighlighted ? "blue" : "ghost"}
        onClick={() => handleNavigation(menu.path)}
        className={location.pathname === menu.path ? "bg-gray-100" : ""}
      >
        {menu.name}
      </Button>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between h-16 items-center">
          {/* 로고 */}
          <div className="flex-shrink-0 flex items-center">
            <Button
              variant="ghost"
              onClick={() => handleNavigation("/home")}
              className="text-xl font-bold px-0"
            >
              병원 로고
            </Button>
          </div>

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center space-x-4">
            {menus.map((menu, idx) => renderMenuItem(menu, idx))}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">메뉴 열기</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menus.map((menu, idx) => (
              <Button
                key={idx}
                variant={menu.isHighlighted ? "blue" : "ghost"}
                className={`w-full justify-start ${
                  location.pathname === menu.path ? "bg-gray-100" : ""
                }`}
                onClick={() => handleNavigation(menu.path)}
              >
                {menu.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
