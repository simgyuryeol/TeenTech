import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import base64 from "base-64";
import Role from "../../components/Login/Role";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { childIdAtom } from "../../recoil/childIdAtom";
import fetchFCMtoken from "../../hooks/fetchFCMToken";
import { useRecoilState } from "recoil";
import { stateAtom, state } from "../../recoil/stateAtom";

// const base_URL = import.meta.env.VITE_SERVER_URL;

const Login2: React.FC = () => {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const childId = useRecoilValue(childIdAtom);
  const SetChildid = useSetRecoilState(childIdAtom);

  const [state, setState] = useRecoilState(stateAtom);

  const [payload, Setpayload] = useState("");
  
  function waitForLocalStorageKey(key) {
    return new Promise((resolve) => {
      const value = localStorage.getItem(key);
      if (value != null) {
        resolve(value);
      } else {
        window.addEventListener('storage', function listener(event) {
          if (event.key === key && event.newValue != null) {
            window.removeEventListener('storage', listener);
            resolve(event.newValue);
          }
        });
      }
    });
  }
  
  // Usage:
  // waitForLocalStorageKey('accessToken').then((value) => console.log(`'myKey' is now set to ${value}`));

  useEffect(() => {
    waitForLocalStorageKey('accessToken').then((value) => fetchFCMtoken());
  }, []);

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
      setState({ id: 1 });
      navigate("../Pmain");
    } else if (auth === '"ROLE_CHILD"') {
      //recoil에 userId 를 childId로 넣어줘야함
      SetChildid((prevChild) => ({
        ...prevChild,
        id: userId,
        pid: parentId,
      }));
      setState({ id: 0 });
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
