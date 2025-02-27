import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PendingRequestsTable from "../../components/admin/PendingRequestsTable";
import axios from "axios";

interface UserInfo {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  roles: string[];
}

interface RoleRequest {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  requestedRole: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestedAt: string;
  processedAt: string | null;
  processedById: number | null;
  processedByName: string | null;
  message: string | null;
}

const SuperAdminDashboard = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [pendingRequests, setPendingRequests] = useState<RoleRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // axios 인스턴스 생성
  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
  });

  useEffect(() => {
    // 사용자 정보와 대기 중인 요청 불러오기
    const fetchUserInfo = api.get<UserInfo>("/user/me");
    const fetchPendingRequests = api.get<RoleRequest[]>(
      "/role-requests/pending"
    );

    Promise.all([fetchUserInfo, fetchPendingRequests])
      .then(([userInfoResponse, pendingRequestsResponse]) => {
        setUserInfo(userInfoResponse.data);
        setPendingRequests(pendingRequestsResponse.data);
        setLoading(false);

        // 슈퍼 관리자 권한이 없으면 접근 거부
        if (!userInfoResponse.data.roles.includes("ROLE_SUPER_ADMIN")) {
          navigate("/admin/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/admin/login");
        } else {
          setError("데이터를 불러오는 데 실패했습니다.");
          setLoading(false);
        }
      });
  }, [navigate]);

  const handleApproveRequest = (requestId: number) => {
    api
      .post(`/role-requests/${requestId}/approve`)
      .then(() => {
        // 승인 후 목록에서 해당 요청 제거
        setPendingRequests(
          pendingRequests.filter((req) => req.id !== requestId)
        );
      })
      .catch((error) => {
        console.error("Error approving request:", error);
        setError("요청 승인 중 오류가 발생했습니다.");
      });
  };

  const handleRejectRequest = (requestId: number, message: string) => {
    api
      .post(`/role-requests/${requestId}/reject`, { message })
      .then(() => {
        // 거부 후 목록에서 해당 요청 제거
        setPendingRequests(
          pendingRequests.filter((req) => req.id !== requestId)
        );
      })
      .catch((error) => {
        console.error("Error rejecting request:", error);
        setError("요청 거부 중 오류가 발생했습니다.");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
      {/* 상단 내비게이션 */}
      <div className="bg-card text-card-foreground my-6 rounded-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">슈퍼 관리자 대시보드</h1>
        <Button onClick={() => navigate("/admin/dashboard")} variant="outline">
          일반 관리자 대시보드로 이동
        </Button>
      </div>

      {/* 사용자 정보 카드 */}
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
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                슈퍼 관리자 권한
              </span>
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

      {/* 권한 요청 관리 섹션 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">권한 요청 관리</h2>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {pendingRequests.length > 0 ? (
          <PendingRequestsTable
            requests={pendingRequests}
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
          />
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            대기 중인 권한 요청이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
