import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface UserInfo {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  roles: string[];
}

const RequestPermission = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
  });

  useEffect(() => {
    api
      .get<UserInfo>("/user/me")
      .then((response) => {
        setUserInfo(response.data);
        setLoading(false);

        if (
          response.data.roles.includes("ROLE_ADMIN") ||
          response.data.roles.includes("ROLE_SUPER_ADMIN")
        ) {
          navigate("/admin/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        // 인증 오류인 경우 로그인 페이지로 리다이렉트
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/admin/login");
        } else {
          setError("사용자 정보를 불러오는 데 실패했습니다.");
          setLoading(false);
        }
      });
  }, [navigate]);

  // 권한 요청 함수
  const handleRequestPermission = () => {
    setSubmitting(true);
    setError(null);

    api
      .post("/role-requests", { role: "ROLE_ADMIN" })
      .then(() => {
        setSuccess(true);
        setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error requesting permission:", error);
        setError(
          axios.isAxiosError(error) && error.response?.data
            ? error.response.data
            : "권한 요청 중 오류가 발생했습니다."
        );
        setSubmitting(false);
      });
  };

  // 로딩 중 UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 기존 UI는 그대로 유지하되, 사용자 정보 표시 부분만 수정
  return (
    <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
      <div className="bg-card text-card-foreground my-6 rounded-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">관리자 권한 요청</h1>
      </div>
      {success ? (
        <div className="text-center">
          <div className="mb-4 text-green-600 text-lg font-medium">
            권한 요청이 성공적으로 제출되었습니다!
          </div>
          <p className="mb-6 text-muted-foreground">
            슈퍼 관리자가 귀하의 요청을 검토한 후 승인할 것입니다. 승인되면
            관리자 기능에 접근할 수 있게 됩니다.
          </p>
          <Button onClick={() => navigate("/")} variant="default">
            홈으로 돌아가기
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    관리자 권한이 필요합니다
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      관리자 기능을 사용하기 위해서는 권한이 필요합니다. 아래
                      정보를 확인하고 권한을 요청해 주세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card text-card-foreground rounded-lg p-6 border">
              <div className="justify-between flex border-b pb-2 mb-4 items-center">
                <h2 className="text-lg font-semibold">사용자 정보</h2>
                <div className="flex justify-center">
                  <Button
                    onClick={handleRequestPermission}
                    disabled={submitting}
                    variant="blue"
                    className="w-full md:w-auto"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        처리 중...
                      </span>
                    ) : (
                      "관리자 권한 요청하기"
                    )}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2">
                    <span className="font-medium text-muted-foreground">
                      이름:
                    </span>{" "}
                    <span className="text-foreground">{userInfo?.name}</span>
                  </p>
                  <p className="mb-2">
                    <span className="font-medium text-muted-foreground">
                      이메일:
                    </span>{" "}
                    <span className="text-foreground">{userInfo?.email}</span>
                  </p>
                  <div className="flex justify-start space-x-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                      권한 대기 중
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

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 mt-4">
                {error}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RequestPermission;
