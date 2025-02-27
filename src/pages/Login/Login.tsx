import { useState } from "react";
import googleLogo from "../../assets/google.png";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleGoogleLogin = () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Redirecting to Google OAuth");
      window.location.href =
        "http://localhost:8080/oauth2/authorization/google";
    } catch (err) {
      setError("로그인 과정에서 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg border w-96">
        <h2 className="text-2xl font-bold text-center mb-6">관리자 로그인</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md transition-colors ${
            isLoading ? "bg-gray-200 cursor-not-allowed" : "hover:bg-gray-50"
          }`}
        >
          {isLoading ? (
            <span>로그인 중...</span>
          ) : (
            <span className="flex justify-center gap-2 items-center text-base font-medium">
              <img
                className="w-7 h-7"
                src={googleLogo}
                alt="google logo for oAuth2 log in"
              ></img>
              Google 계정으로 로그인
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
