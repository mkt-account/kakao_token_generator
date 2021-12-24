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
    redirect_uri: "http://localhost:3000/callback",
    code: new URL(window.location.href).searchParams.get("code"),
  };

  // // 소재 리포트 API 호출시 필요한 쿼리 스트링
  // function queryStringCR(listValue: any) {
  //   const qs = listValue.map((e: any) => encodeURIComponent(e.id));
  //   return qs.join();
  // }

  // const campaign_ids_list: any = [];
  // const adgroup_ids_list: any = [];
  // const creative_ids_list: any = [];
  // const creative_report_list: any = [];

  // function getAccessTokenByRefresh(val: String) {
  //   // 리프레시 토큰으로 요청 시 필요한 데이터
  //   let refresh_token_request_data = {
  //     grant_type: "refresh_token",
  //     client_id: "43f549702447220f4fcc36be44a61bc6",
  //     refresh_token: val,
  //   };
  //   axios
  //     .post(
  //       "https://kauth.kakao.com/oauth/token?" +
  //         queryString(refresh_token_request_data),
  //       {
  //         headers: {
  //           "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       const getTokenByRefresh = response.data;
  //       setNewAccessToken(getTokenByRefresh.access_token);
  //       return console.log("getTokenByRefresh", getTokenByRefresh);
  //     });
  // }

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

        // // 캠페인 ID 목록 요청
        // axios({
        //   method: "GET",
        //   url: "https://apis.moment.kakao.com/openapi/v4/campaigns",
        //   headers: {
        //     Authorization: "Bearer " + getTokenInfo.access_token,
        //     adAccountId: "83161",
        //   },
        //   params: {
        //     config: "ON",
        //   },
        // }).then((campaign_ids) => {
        //   campaign_ids.data.content.map((e: any) => {
        //     const element: any = {};
        //     element["id"] = e.id;
        //     element["name"] = e.name;
        //     campaign_ids_list.push(element);
        //   });
        //   console.log("campaign_ids_list", campaign_ids_list);

        //   // 캠페인 ID로 광고 그룹 ID 목록 확보. 사용자 계정, 광고계정마다 5초에 한 번씩 요청 가능하도록 제한
        //   let adgroup_counter = 0;
        //   const getAdgroupIds = setInterval(() => {
        //     // if (adgroup_counter === campaign_ids_list.length) {
        //     if (adgroup_counter === 0) {
        //       clearInterval(getAdgroupIds);
        //       console.log("getAdgroupIds, cleared interval");

        //       // 인터벌 끝나면 소재 ID 리스트 요청
        //       let creative_counter = 0;
        //       const getCreativeIds = setInterval(() => {
        //         if (creative_counter === 0) {
        //           clearInterval(getCreativeIds);
        //           console.log("getCreativeIds, cleared interval");

        //           // 인터벌 끝나면 소재 리포트 요청
        //           // 한번에 최대 100개까지 요청. 광고계정 번호, 앱 ID당 10초에 한 번으로 제한
        //           let creative_report_counter = 0;
        //           const getCreativeReport = setInterval(() => {
        //             if (creative_report_counter >= creative_ids_list.length) {
        //               clearInterval(getCreativeReport);
        //               console.log("getCreativeReport, cleared interval");
        //             } else {
        //               axios({
        //                 method: "GET",
        //                 url: "https://apis.moment.kakao.com/openapi/v4/creatives/report",
        //                 headers: {
        //                   Authorization: "Bearer " + getTokenInfo.access_token,
        //                   adAccountId: "83161",
        //                 },
        //                 params: {
        //                   // creativeId: queryStringCR(
        //                   //   creative_ids_list.slice(
        //                   //     creative_report_counter,
        //                   //     creative_report_counter + 100
        //                   //   )
        //                   //   ),
        //                   creativeId: "16940450",
        //                   dimension: "PLACEMENT",
        //                   metricsGroup: "MESSAGE",
        //                   start: "20211201",
        //                   end: "20211221",
        //                 },
        //               }).then((creative_report) => {
        //                 console.log(creative_report);
        //                 // creative_report.data.content.map((e: any) => {
        //                 //   const element: any = {};
        //                 //   element["id"] = e.id;
        //                 //   element["name"] = e.name;
        //                 //   creative_report_list.push(element);
        //                 // });
        //                 // console.log("creative_report_list", creative_report_list);
        //               });
        //               creative_report_counter += 100;
        //             }
        //           }, 11000);
        //         } else {
        //           axios({
        //             method: "GET",
        //             url: "https://apis.moment.kakao.com/openapi/v4/creatives",
        //             headers: {
        //               Authorization: "Bearer " + getTokenInfo.access_token,
        //               adAccountId: "83161",
        //             },
        //             params: {
        //               adGroupId: adgroup_ids_list[creative_counter]["id"],
        //               config: "ON",
        //             },
        //           }).then((creative_ids) => {
        //             creative_ids.data.content.map((e: any) => {
        //               const element: any = {};
        //               element["id"] = e.id;
        //               element["name"] = e.name;
        //               creative_ids_list.push(element);
        //             });
        //             console.log("creative_ids_list", creative_ids_list);
        //           });
        //           creative_counter++;
        //         }
        //       }, 5000);
        //     } else {
        //       axios({
        //         method: "GET",
        //         url: "https://apis.moment.kakao.com/openapi/v4/adGroups",
        //         headers: {
        //           Authorization: "Bearer " + getTokenInfo.access_token,
        //           adAccountId: "83161",
        //         },
        //         params: {
        //           campaignId: campaign_ids_list[adgroup_counter]["id"],
        //           config: "ON",
        //         },
        //       }).then((adgroup_ids) => {
        //         adgroup_ids.data.content.map((e: any) => {
        //           const element: any = {};
        //           element["id"] = e.id;
        //           element["name"] = e.name;
        //           adgroup_ids_list.push(element);
        //         });
        //         console.log("adgroup_ids_list", adgroup_ids_list);
        //       });
        //       adgroup_counter++;
        //     }
        //   }, 5000);
        // });
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
