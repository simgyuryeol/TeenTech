import React, { useEffect, useState } from "react";
import Total from "../../components/Main/total";
import MenuList from "../../components/Main/MenuList";
import { useRecoilState } from "recoil";
import { stateAtom, state } from "../../recoil/stateAtom";
import { childIdAtom } from "../../recoil/childIdAtom";
import { balanceAtom } from "../../recoil/balanceAtom";
import Boy from "../../../src/assets/main/boy_1.png";
import axios from "axios";
import Bot from "../Child/Bot/Bot";

interface Detail {
  creditRating: number;
  deposit: number;
  loanBalance: number;
  loneDay: number;
  stock: number;
  stockRate: number;
  totalBalance: null | number;
  username: null | string;
}

const Main: React.FC = () => {
  const [state, setState] = useRecoilState(stateAtom);
  const [getAllowance, setGetAllowance] = useState(0);
  const [childDetail, setChildDetail] = useState<Detail>();
  const [totalBalance, setTotalBalance] = useRecoilState(balanceAtom);

  const getDetail = () => {
    console.log("asiox..");
    setState({ id: 0 });
    axios
      .get(`https://j9e207.p.ssafy.io/api/v1/childs/child/34`)
      .then((response) => {
        setChildDetail(response.data.data);
        setTotalBalance(response.data.data.totalBalance);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div
      className="max-h "
      style={{
        backgroundColor: "#F6F6F6",
        overflow: "scroll",
        position: "relative",
      }}
    >
      <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 9999 }}>
        <div className="flex items-end">
          <div className="bg-sky-200 rounded-lg drop-shadow-md p-2 mb-3">
            질문해줘
          </div>
          <Bot />
        </div>
      </div>

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
            {childDetail === undefined
              ? "로딩 중..."
              : childDetail.totalBalance === null
              ? "남은 용돈이 없어요"
              : childDetail.totalBalance.toLocaleString()}
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
          <div>{childDetail?.username}님의</div>
          <div>현재 잔액은</div>
        </div>
      </div>
      <div style={{ height: "65px" }}></div>
      <div className="mx-4 rounded-2xl mt-28">
        <Total childId={34} />
      </div>
      {/* <GptTest /> */}
    </div>
  );
};

export default Main;
