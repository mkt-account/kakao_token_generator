import Header from "../Header";

export default function Init() {
  const codeParams = {
    init_url: "https://kauth.kakao.com/oauth/authorize?client_id=",
    client_id: "43f549702447220f4fcc36be44a61bc6",
    redirect_uri: "http://localhost:3000/callback",
  };

  return (
    <>
      <Header />
      <div>
        <div className="mx-auto">
          <div className="m-8 space-y-3">
            <div>
              <label>
                <p>새로운 리프레시 토큰을 발급받으면 기존 토큰은 만료됩니다.</p>
                <p>
                  발급 후 반드시 젠킨스에서 해당 작업의 매개변수를 변경해주세요.
                </p>
                <p>
                  <a
                    href="http://10.0.0.18:8080/view/marketing/job/%EC%B9%B4%EC%B9%B4%EC%98%A4%EB%AA%A8%EB%A8%BC%ED%8A%B8%20API/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-bold"
                  >
                    젠킨스 링크
                  </a>
                </p>
              </label>
            </div>
            <div>
              <label>
                <p>ID : mkt_account@bucketplace.net</p>
                <p>비밀번호는 마케팅팀 위키 참고</p>
                <p>
                  <a
                    href="https://wiki.dailyhou.se/pages/viewpage.action?pageId=29605756"
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-bold"
                  >
                    위키 링크
                  </a>
                </p>
              </label>
            </div>
            <a
              href={`${codeParams.init_url}${codeParams.client_id}&redirect_uri=${codeParams.redirect_uri}&response_type=code`}
            >
              <button className="mt-8 px-9 py-3 border-2 rounded-lg bg-black text-white hover:bg-gray-200 hover:text-black">
                새로운 리프레시 토큰 받기
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
