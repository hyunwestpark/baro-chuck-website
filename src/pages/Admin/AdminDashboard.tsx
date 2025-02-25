// AdminDashboard.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AdminFeaturesGrid from "../../components/admin/AdminFeaturesGrid";
import axios from "axios";

interface UserInfo {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  roles: string[];
}

// 관리자 기능 정의
const adminFeatures = [
  {
    id: "notices",
    title: "공지사항 관리",
    description: "공지사항을 생성, 수정 및 삭제합니다.",
    route: "/admin/notices",
    buttonText: "공지사항 관리하기",
  },
];

const AdminDashboard = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // axios 인스턴스 생성
  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
  });

  useEffect(() => {
    api
      .get<UserInfo>("/user/me") // 백엔드 API 경로 수정
      .then((response) => {
        setUserInfo(response.data);
        setLoading(false);

        // 관리자 역할이 없으면 권한 요청 페이지로 리다이렉트
        if (
          !response.data.roles.includes("ROLE_ADMIN") &&
          !response.data.roles.includes("ROLE_SUPER_ADMIN")
        ) {
          navigate("/request-permission");
        }
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        // 인증 오류인 경우 로그인 페이지로 리다이렉트
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/admin/login");
        } else {
          // 다른 오류의 경우에도 로그인 페이지로 리다이렉트
          navigate("/admin/login");
        }
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const isSuperAdmin = userInfo?.roles.includes("ROLE_SUPER_ADMIN");
  const isAdmin = userInfo?.roles.includes("ROLE_ADMIN");

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
      {/* 상단 내비게이션 */}
      <div className="bg-card text-card-foreground my-6 rounded-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">관리자 대시보드</h1>
        {isSuperAdmin && (
          <Button
            onClick={() => navigate("/super-admin/dashboard")}
            variant="outline"
          >
            슈퍼 관리자 대시보드로 이동
          </Button>
        )}
      </div>

      <div className="bg-card text-card-foreground rounded-lg p-6 mb-6 border">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          사용자 정보
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2">
              <span className="font-medium text-muted-foreground">이름:</span>{" "}
              <span className="text-foreground">{userInfo?.name}</span>
            </p>
            <p className="mb-2">
              <span className="font-medium text-muted-foreground">이메일:</span>{" "}
              <span className="text-foreground">{userInfo?.email}</span>
            </p>
            <div className="flex justify-start space-x-2">
              {isAdmin && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  관리자 권한
                </span>
              )}
              {isSuperAdmin && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  슈퍼 관리자 권한
                </span>
              )}
            </div>
          </div>
          {userInfo?.imageUrl && (
            <div className="flex justify-end">
              <img
                src={userInfo.imageUrl}
                alt="프로필 이미지"
                className="w-16 h-16 rounded-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* 관리자 기능 섹션 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">관리자 기능</h2>
        <AdminFeaturesGrid features={adminFeatures} />
      </div>
    </div>
  );
};

export default AdminDashboard;
