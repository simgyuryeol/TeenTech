import React, { useEffect } from "react";
import Total from "../../components/Main/total";
import MenuList from "../../components/Main/MenuList";
import { useRecoilState } from "recoil";
import { stateAtom, state } from "../../recoil/stateAtom";

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
        className="justify-between items-center px-8"
        style={{
          display: "flex",
          height: "150px",
          backgroundColor: "#CCE5F2",
          position: "relative", // 추가: 부모 요소를 relative로 설정
          borderRadius: "0px 0px 20px 20px",
        }}
      >
        {/* 추가: 부분적으로 가려질 두 번째 div */}
        <div
          className="bg-white m-3 rounded-2xl mb-4 drop-shadow-xl"
          style={{
            position: "absolute", // 추가: 겹치게 하기 위해 absolute로 설정
            top: 100, // 추가: 부모 요소 상단에 배치
            left: 0, // 추가: 부모 요소 왼쪽에 배치
            width: "94%", // 추가: 부모 요소와 같은 너비
            height: "100%", // 추가: 부모 요소와 같은 높이
            zIndex: 1, // 추가: 다른 요소 위에 표시
            display: "flex", // 부모 div를 flex 컨테이너로 만듭니다.
            flexDirection: "column", // 자식 요소들을 세로로 배치합니다.
          }}
        >
          {/* 내용 추가 */}
          <div
            className="text-xl mt-4 text-center "
            style={{
              flex: "25%",
            }}
          >
            내 용돈은 얼마 남았을까?
          </div>
          <div
            className="text-4xl my-5 text-center"
            style={{
              flex: "75%",
            }}
          >
            100000
          </div>
        </div>
        <div className="text-2xl text-start pl-3">
          <div>심규렬님의</div>
          <div>현재 잔액은</div>
        </div>
        <div className="mb-7">
          <img
            src="../../../src/assets/Teen9/Dog.png"
            style={{
              height: "120px",
              objectFit: "cover",
            }}
            alt=""
          />
        </div>
      </div>
      <div style={{ height: "120px" }}></div>
      <div className="mx-4 rounded-2xl">
        <Total childId={id} />
      </div>
      <div>
        <MenuList />
      </div>
    </div>
  );
};

export default Main;
