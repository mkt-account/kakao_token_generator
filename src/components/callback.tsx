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
              만료 일시 : {calcExpireDate(refreshTokenExpire)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
