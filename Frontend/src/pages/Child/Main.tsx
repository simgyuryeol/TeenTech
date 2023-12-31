import React, { useEffect, useState } from "react";
import Total from "../../components/Main/total";
import MenuList from "../../components/Main/MenuList";
import { useRecoilState } from "recoil";
import { stateAtom, state } from "../../recoil/stateAtom";
import { childIdAtom } from "../../recoil/childIdAtom";
import { quizPointAtom } from "../../recoil/quizPointAtom";
import { balanceAtom } from "../../recoil/balanceAtom";
import { teen9Atom } from "../../recoil/teen9Atom";
import Boy from "../../../src/assets/main/boy_1.png";
import axios from "axios";

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
  const [teen9url, setTeen9Url] = useRecoilState(teen9Atom);
  const [totalBalance, setTotalBalance] = useRecoilState(balanceAtom);
  const [child, setChild] = useRecoilState(childIdAtom);
  const [quizPoint, setQuizPoint] = useRecoilState(quizPointAtom);

  const getDetail = () => {
    console.log("asiox..");
    console.log(child);
    setState({ id: 0 });
    axios
      .get(`https://j9e207.p.ssafy.io/api/v1/childs/child/${child.id}`)
      .then((response) => {
        setChildDetail(response.data.data);
        setTotalBalance(response.data.data.totalBalance);
        setChild({
          id: child.id,
          pid: child.pid,
          name: response.data.data.username,
        });
        setQuizPoint(response.data.data.quizPoint);
        // setTeen9Url(response.data.data.avatarImageUrl);
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
        <Total childId={child.id} />
      </div>
    </div>
  );
};

export default Main;
