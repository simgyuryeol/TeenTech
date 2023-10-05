import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import base64 from "base-64";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { childIdAtom } from "../../recoil/childIdAtom";
import axios from "axios";

const base_URL = import.meta.env.VITE_SERVER_URL;

const Login3: React.FC = () => {
  const [accessToken, setAccessToken] = useState(window.localStorage.getItem('accessToken'))
//   const accessToken = window.localStorage.getItem("accessToken");
  const [payload, Setpayload] = useState("");
  const authtargetKey = "auth";
  const authregex = new RegExp(`"${authtargetKey}":"([^"]+)"`);
  const authmatch = payload.match(authregex);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const auth = authmatch ? authmatch[1] : "";
  const accounttargetKey = "accountNumber";
  const accountregex = new RegExp(`"${accounttargetKey}":"([^"]+)"`);
  const accountmatch = payload.match(accountregex);
  const accountNumber = accountmatch ? accountmatch[1] : "";
  const parentIdtargetKey = "parentId";
  const parentIdregex = new RegExp(`"${parentIdtargetKey}":([^"]+),`);
  const parentIdmatch = payload.match(parentIdregex);
  const parentId = parentIdmatch ? parentIdmatch[1] : "";

  const childId = useRecoilValue(childIdAtom);
  const SetChildid = useSetRecoilState(childIdAtom);

  const navigate = useNavigate();
  const reload = () => {
    axios
      .post(
        base_URL + `/api/v1/users/reissue`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data);
        window.localStorage.setItem("accessToken", response.data.data.accessToken);
        setAccessToken(window.localStorage.getItem("accessToken"))

            const payload = accessToken.substring(
            accessToken.indexOf(".") + 1,
            accessToken.lastIndexOf(".")
          );
          const dec = base64.decode(payload);
          Setpayload(dec);
          console.log(dec)
          console.log(payload)
          const parentIdtargetKey = "parentId";
          const parentIdregex = new RegExp(`"${parentIdtargetKey}":([^"]+),`);
          const parentIdmatch = payload.match(parentIdregex);
          const parentId = parentIdmatch ? parentIdmatch[1] : "";
          SetChildid((prevChild) => ({
            ...prevChild,
            pid: Number(parentId),
          }));
          console.log(childId.pid)
          if (Number(parentId) != 0) {
            navigate("../main");
          }


        // performReload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const performReload = () => {
    window.location.reload();
  };
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const payload = accessToken.substring(
      accessToken.indexOf(".") + 1,
      accessToken.lastIndexOf(".")
    );
    const dec = base64.decode(payload);
    Setpayload(dec);
    // const parentIdtargetKey = "parentId";
    // const parentIdregex = new RegExp(`"${parentIdtargetKey}":([^"]+),`);
    // const parentIdmatch = payload.match(parentIdregex);
    // const parentId = parentIdmatch ? parentIdmatch[1] : "";
    // console.log(parentId)
    console.log(`'차일드아이디':${childId.id}`);
    console.log(`'부모 아이디':${childId.pid}`);
    if (childId.pid != 0) {
      navigate("../main");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  return (
    <div className="w-[100vw] h-[100vh]" style={{ backgroundColor: "#B6DBEE" }}>
      <div className="h-[20vh]"></div>
      <h2 className="text-5xl mb-10">부모님과 연결해주세요!</h2>
      <div className="text-7xl">
        계좌번호
        <div className="text-6xl mb-20">{accountNumber}</div>
      </div>
      <div className="text-3xl" onClick={reload}>
        확인
      </div>
      <Link
        to="/"
        className="text-5xl text-gray-600 fixed top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden rounded-xl w-[70%] sm:w-[70%] md:w-[50%] lg:w-[30%]"
      >
        돌아가기
      </Link>
    </div>
  );
};

export default Login3;
