import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";

export default function Callback() {
  const [refreshToken, setRefreshToken] = useState<string>();
  const [refreshTokenExpire, setRefreshTokenExpire] = useState();
  const [newAccessToken, setNewAccessToken] = useState();

  // 토큰 요청 시 쿼리 스트링으로 변환
  function queryString(obj: { [index: string]: any }) {
    const qs = Object.keys(obj).map(
      (e) => encodeURIComponent(e) + "=" + encodeURIComponent(obj[e])
    );
    return qs.join("&");
  }

  // 토큰 요청 시 필요한 데이터
  let token_request_data = {
    grant_type: "authorization_code",
    client_id: "43f549702447220f4fcc36be44a61bc6",
    // redirect_uri: "http://localhost:3000/callback", // develop
    redirect_uri: "https://main.d1k90doxksawje.amplifyapp.com/callback", // production
    code: new URL(window.location.href).searchParams.get("code"),
  };

  function getToken() {
    // 토큰 요청
    axios
      .post(
        "https://kauth.kakao.com/oauth/token?" +
          queryString(token_request_data),
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((response) => {
        const getTokenInfo = response.data;
        console.log("getTokenInfo", getTokenInfo);
        setRefreshToken(getTokenInfo.refresh_token);
        setRefreshTokenExpire(getTokenInfo.refresh_token_expires_in);
      });
  }
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("복사 되었습니다.");
    } catch (error) {
      alert("복사 실패!");
    }
  };

  function calcExpireDate(sec: number) {
    const today = new Date().getTime();
    const secToMS = sec * 1000;
    const expires = today + secToMS;
    const expiresDate = new Date(expires);
    return expiresDate.toLocaleString();
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <Header />
      <div>
        <div className="mx-auto">
          <div className="ml-8 mt-8 mr-8 font-bold">새로운 refresh_token</div>

          <div className="ml-8 mt-2 mb-8 mr-8">
            {refreshToken && (
              <button
                className="text-left border p-3"
                onClick={() => handleCopyClipBoard(refreshToken)}
              >
                {refreshToken}
              </button>
            )}
          </div>
          {refreshTokenExpire && (
            <div className="m-8 font-bold">
              <p>만료 일시 : {calcExpireDate(refreshTokenExpire)}</p>
              <p>새로운 리프레시 토큰을 발급받으면 기존 토큰은 만료됩니다.</p>
              <p>
                발급 후 반드시 젠킨스에서 해당 작업의 매개변수를 변경해주세요.
              </p>
              <p>
                <a
                  href="http://10.0.0.18:8080/view/Marketing%20Report%20Raw/job/%EC%B9%B4%EC%B9%B4%EC%98%A4%EB%AA%A8%EB%A8%BC%ED%8A%B8%20MA/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-bold"
                >
                  젠킨스 링크
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
