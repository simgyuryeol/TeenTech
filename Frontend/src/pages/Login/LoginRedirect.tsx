import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import base64 from "base-64";
import Role from "../../components/Login/Role";

// const base_URL = import.meta.env.VITE_SERVER_URL;

const Login2: React.FC = () => {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const [payload, Setpayload] = useState("");
  const authtargetKey = "auth";
  const authregex = new RegExp(`"${authtargetKey}":"([^"]+)"`);
  const authmatch = payload.match(authregex);
  const auth = authmatch ? authmatch[1] : "";
  const accounttargetKey = "accountNumber";
  const accountregex = new RegExp(`"${accounttargetKey}":"([^"]+)"`);
  const accountmatch = payload.match(accountregex);
  const accountNumber = accountmatch ? accountmatch[1] : "";
  const parentIdtargetKey = "parentId";
  const parentIdregex = new RegExp(`"${parentIdtargetKey}":([^"]+),`);
  const parentIdmatch = payload.match(parentIdregex);
  const parentId = parentIdmatch ? parentIdmatch[1] : "";
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
    if (auth === "ROLE_USER") {
      handleOpen(1);
    } else if (auth === "ROLE_PARENT") {
      navigate("../Pmain");
    } else if (auth === "ROLE_CHILD") {
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
