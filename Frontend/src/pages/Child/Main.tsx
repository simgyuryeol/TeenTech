import React, { useEffect } from "react";
import Total from "../../components/Main/total";
import MenuList from "../../components/Main/MenuList";
import { useRecoilState } from "recoil";
import { stateAtom, state } from "../../recoil/stateAtom";
import Boy from "../../../src/assets/main/boy_1.png";
import GptTest from "./gpt_test/GptTest";

const Main: React.FC = () => {
  const [state, setState] = useRecoilState(stateAtom);
  useEffect(() => {
    setState({ id: 2 });
  }, []);
  const id = 1;
  return (
    <div
      className="max-h"
      style={{ backgroundColor: "#F6F6F6", overflow: "scroll" }}
    >
      <div
        className="justify-between items-center px-8 flex relative"
        style={{
          height: "150px",
          backgroundColor: "#B6DBEE",
          borderRadius: "0px 0px 20px 20px",
        }}
      >
        {/* 추가: 부분적으로 가려질 두 번째 div */}
        <div
          className="bg-white m-3 rounded-2xl mb-4 drop-shadow-xl absolute flex flex-col	"
          style={{
            top: 100,
            left: 0,
            width: "94%",
            zIndex: 1,
          }}
        >
          <div
            className="text-xl mt-4 text-start mx-5"
            style={{
              flex: "25%",
            }}
          >
            내 용돈은 얼마 남았을까?
          </div>
          <div
            className="text-5xl mt-1 mb-6 text-start mx-5"
            style={{
              flex: "75%",
              marginRight: "10px",
            }}
          >
            100000
          </div>
          <div>
            <MenuList />
          </div>
        </div>
        <div
          style={{
            position: "absolute", // 겹치게 하기 위해 absolute로 설정
            bottom: -15,
            right: 40,
          }}
        >
          <img
            src={Boy}
            style={{
              height: "145px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="text-2xl text-start pl-3">
          <div>심규렬님의</div>
          <div>현재 잔액은</div>
        </div>
      </div>
      <div style={{ height: "65px" }}></div>
      <div className="mx-4 rounded-2xl mt-28">
        <Total childId={id} />
      </div>
      <GptTest />
    </div>
  );
};

export default Main;
