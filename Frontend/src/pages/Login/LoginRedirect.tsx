import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import base64 from "base-64";
import Role from "../../components/Login/Role";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { childIdAtom } from "../../recoil/childIdAtom";
import fetchFCMtoken from "../../hooks/fetchFCMToken";

// const base_URL = import.meta.env.VITE_SERVER_URL;

const Login2: React.FC = () => {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const childId = useRecoilValue(childIdAtom);
  const SetChildid = useSetRecoilState(childIdAtom);

  const [payload, Setpayload] = useState("");
  
  useEffect(() => {
    fetchFCMtoken();
  }, []);

  // const authtargetKey = 'auth';
  // const authregex = new RegExp(`"${authtargetKey}":"([^"]+)"`);
  // const authmatch = payload.match(authregex);
  // const auth = authmatch ? authmatch[1] : '';

  // const accounttargetKey = 'accountNumber';
  // const accountregex = new RegExp(`"${accounttargetKey}":"([^"]+)"`);
  // const accountmatch = payload.match(accountregex);
  // const accountNumber = accountmatch ? accountmatch[1] : '';

  // const parentIdtargetKey = 'parentId';
  // const parentIdregex = new RegExp(`"${parentIdtargetKey}":([^"]+),`);
  // const parentIdmatch = payload.match(parentIdregex);
  // const parentId = parentIdmatch ? parentIdmatch[1] : '';

  // const userIdtargetKey = 'userId';
  // const userIdregex = new RegExp(`"${userIdtargetKey}":([^"]+),`);
  // const userIdmatch = payload.match(userIdregex);
  // const userId = userIdmatch ? userIdmatch[1] : '';

  function extractValue(payload, targetKey) {
    const regex = new RegExp(`"${targetKey}":([^,]+)`);
    const match = payload.match(regex);
    return match ? match[1] : "";
  }

  const auth = extractValue(payload, "auth");
  const accountNumber = extractValue(payload, "accountNumber");
  const parentId = extractValue(payload, "parentId");
  const userId = extractValue(payload, "userId");

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = new URL(window.location.href).searchParams.get("token");
    window.localStorage.setItem("accessToken", accessToken);
    const payload = accessToken.substring(
      accessToken.indexOf(".") + 1,
      accessToken.lastIndexOf(".")
    );
    const dec = base64.decode(payload);
    Setpayload(dec);
    if (auth === '"ROLE_USER"') {
      handleOpen(1);
    } else if (auth === '"ROLE_PARENT"') {
      //recoil에 userId를 parentId로 넣어줘야함
      SetChildid((prevChild) => ({
        ...prevChild,
        pid: userId,
      }));
      navigate("../Pmain");
    } else if (auth === '"ROLE_CHILD"') {
      //recoil에 userId 를 childId로 넣어줘야함
      SetChildid((prevChild) => ({
        ...prevChild,
        id: userId,
        pid: parentId,
      }));
      console.log(childId);
      navigate("../oauth/redirect2");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return (
    <div className="w-[100vw] h-[100vh]" style={{ backgroundColor: "#B6DBEE" }}>
      <h2>로그인 리다이렉트 페이지</h2>
      <div>{auth}</div>
      <div>{accountNumber}</div>
      <div>{parentId}</div>
      <div>{userId}</div>
      <div>{payload}</div>
      <Link
        to="/"
        className="text-5xl text-gray-600 fixed top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden rounded-xl w-[70%] sm:w-[70%] md:w-[50%] lg:w-[30%]"
      >
        돌아가기
      </Link>
      {open === 1 && <Role closeModal={handleOpen}></Role>}
    </div>
  );
};

export default Login2;
